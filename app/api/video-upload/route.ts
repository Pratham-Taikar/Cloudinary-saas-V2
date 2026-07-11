import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';
import Video from '@/models/video.models';
import User from '@/models/user.models';
import connectDB, { getDatabaseErrorMessage } from '@/lib/db';
import services from '@/lib/services';

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface VideoUploadPayload {
  title?: string;
  description?: string;
  publicId?: string;
  originalSize?: number;
  compressedSize?: number;
  duration?: number;
}

async function deleteUploadedVideo(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (cleanupError) {
    console.error("Failed to delete orphaned Cloudinary video", cleanupError);
  }
}

async function parseJsonBody(request: NextRequest) {
  return (await request.json()) as VideoUploadPayload;
}

export async function POST( request: NextRequest ){
  let uploadedPublicId: string | undefined;
 
  try {

    const {userId} = await auth();

    if( !userId ){
      return NextResponse.json(
        {error: "Unauthorized Request"},
        { status: 401 }
      )
    }

    await connectDB();

    const user = await User.findOne({ userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await parseJsonBody(request)
    const { title, description, publicId, originalSize, compressedSize, duration } = body;
    uploadedPublicId = publicId;

    if (!publicId) {
      return NextResponse.json(
        { error: "Uploaded video identifier not found" },
        { status: 400 }
      )
    }

    const plan = services[user.plan] || services.free;

    if (user.videoCount >= plan.videoLimit) {
      if (uploadedPublicId) {
        await deleteUploadedVideo(uploadedPublicId);
      }
      return NextResponse.json(
        { error: "Video limit reached. Upgrade required." },
        { status: 403 }
      );
    }

    if( !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET ){
      return NextResponse.json(
        { error: "Cloudinary environment variables not configured" },
        { status: 500 }
      )
    }

    const video = await Video.create({
      title: title?.trim() || "No Title",
      description: description?.trim() || "",
      originalSize: Number(originalSize) || 0,
      compressedSize: Number(compressedSize) || 0,
      userId: String(userId),
      publicId: String(publicId),
      duration: Number(duration) || 0,
    })

    if( !video ){
      await deleteUploadedVideo(String(publicId));
      return NextResponse.json(
        { error: "Saving Video Failed in db" },
        { status: 500 }
      )
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { $inc: { videoCount: 1 } },
      { new: true }
    )

    return NextResponse.json(
      { 
        video,
        updatedUser
      },
      { status: 201 }
    )

  } catch (error: any) {
    if (uploadedPublicId) {
      await deleteUploadedVideo(uploadedPublicId);
    }
    console.log("Error: ", error)
    return NextResponse.json(
      { error: "Upload Video Failed", details: getDatabaseErrorMessage(error) },
      { status: 503 }
    )
  }
}