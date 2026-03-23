import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
import services, { type PlanKey } from "@/lib/services";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("RAZORPAY_ERROR: Missing API keys in env");
      return NextResponse.json(
        { error: "Razorpay configuration error: Missing API keys" },
        { status: 500 },
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { planKey } = body;
    console.log(
      `RAZORPAY_LOG: Creating order for plan: ${planKey}, user: ${userId}`,
    );

    if (!planKey || !services[planKey as PlanKey]) {
      return NextResponse.json(
        { error: `Invalid plan selected: ${planKey}` },
        { status: 400 },
      );
    }

    const plan = services[planKey as PlanKey];
    const amount = Math.round(plan.price * 100); // Ensure integer

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Plan amount must be greater than 0" },
        { status: 400 },
      );
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${userId.substring(0, 10)}_${Date.now()}`,
      notes: {
        userId,
        planKey,
      },
    };

    console.log(
      "RAZORPAY_LOG: Calling razorpay.orders.create",
      JSON.stringify(options),
    );

    try {
      const order = await razorpay.orders.create(options);
      console.log("RAZORPAY_LOG: Order created successfully:", order.id);
      return NextResponse.json(order, { status: 200 });
    } catch (rzpError: any) {
      console.error("RAZORPAY_SDK_ERROR:", rzpError);
      return NextResponse.json(
        {
          error: "Razorpay SDK error",
          details:
            rzpError.description ||
            rzpError.message ||
            JSON.stringify(rzpError),
        },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("RAZORPAY_UNEXPECTED_ERROR:", error);
    return NextResponse.json(
      {
        error: "Internal server error during order creation",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
