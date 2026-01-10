import connectDB from "@/lib/db";
import Video from "@/models/video.models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const videos = await Video.find().sort({ createdAt: -1 });

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
