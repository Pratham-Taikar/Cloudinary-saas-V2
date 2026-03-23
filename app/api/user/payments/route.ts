import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import PaymentHistory from "@/models/payment.models";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const payments = await PaymentHistory.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error("Fetch Payments Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment history" },
      { status: 500 },
    );
  }
}
