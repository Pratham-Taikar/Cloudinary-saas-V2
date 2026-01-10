import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,
        message: "MongoDB connected successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
