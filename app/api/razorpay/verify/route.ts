import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/models/user.models";
import PaymentHistory from "@/models/payment.models";
import services, { type PlanKey } from "@/lib/services";
import dayjs from "dayjs";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bodyText = await request.text();
    console.log("VERIFY_LOG: Received body:", bodyText);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planKey,
    } = JSON.parse(bodyText);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("VERIFY_ERROR: Missing parameters", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      return NextResponse.json(
        { error: "Payment verification failed: Missing parameters" },
        { status: 400 },
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("VERIFY_ERROR: RAZORPAY_KEY_SECRET missing in env");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 },
      );
    }

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("VERIFY_LOG: Signatures", {
      generated: generated_signature,
      received: razorpay_signature,
    });

    const isSignatureValid = generated_signature === razorpay_signature;

    if (isSignatureValid) {
      console.log("VERIFY_LOG: Signature valid. Connecting to DB...");
      await connectDB();

      // Set plan expiry to 30 days from now
      const planExpiry = dayjs().add(30, "day").toDate();
      const lastBillingDate = new Date();

      // 1. Update user plan and billing info
      const updatedUser = await User.findOneAndUpdate(
        { userId: userId },
        { 
          plan: planKey as PlanKey,
          planExpiry,
          lastBillingDate,
          imageCount: 0, // Reset counts on new payment
          videoCount: 0
        },
        { new: true },
      );

      if (!updatedUser) {
        console.error("VERIFY_ERROR: User not found", userId);
        return NextResponse.json(
          { error: "User profile not found in database" },
          { status: 404 },
        );
      }

      console.log("VERIFY_LOG: User plan updated to:", planKey);

      // 2. Create payment record
      try {
        const plan = services[planKey as PlanKey];
        const payment = await PaymentHistory.create({
          userId: userId,
          razorpay_order_id,
          razorpay_payment_id,
          amount: plan.price,
          plan: plan.name,
          status: "success",
        });
        console.log("VERIFY_LOG: Payment record created:", payment._id);
      } catch (payErr: any) {
        console.error("VERIFY_PAYMENT_RECORD_ERROR:", payErr);
        // Still return success since the plan was updated
      }

      return NextResponse.json(
        { message: "Payment verified and plan upgraded successfully" },
        { status: 200 },
      );
    } else {
      console.error("VERIFY_ERROR: Signature mismatch");
      return NextResponse.json(
        { error: "Invalid payment signature. Verification failed." },
        { status: 400 },
      );
    }
  } catch (error: any) {
    console.error("VERIFY_UNEXPECTED_ERROR:", error);
    return NextResponse.json(
      { error: "Internal verification error", details: error.message },
      { status: 500 },
    );
  }
}
