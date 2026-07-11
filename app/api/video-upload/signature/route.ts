import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/user.models";
import connectDB from "@/lib/db";
import services from "@/lib/services";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized Request" }, { status: 401 });
  }

  try {
    await connectDB();

    const user = await User.findOne({ userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const plan = services[user.plan] || services.free;

    if (user.videoCount >= plan.videoLimit) {
      return NextResponse.json(
        { error: "Video limit reached. Upgrade required." },
        { status: 403 }
      );
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary environment variables not configured" },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "saas-video-uploads";
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      timestamp,
      signature,
      folder,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate video upload signature" },
      { status: 503 }
    );
  }
}