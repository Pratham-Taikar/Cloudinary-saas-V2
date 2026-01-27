import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';
import Video from '@/models/video.models';
import connectDB from '@/lib/db';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface CloudinaryUploadResult{
  public_id: string
  bytes: number
  duration?: number 
  [key: number] : any
}

export async function POST( request: NextRequest ){
 
  try {

    const {userId} = await auth();

    if( !userId ){
      return NextResponse.json(
        {error: "Unauthorized Request"},
        { status: 401 }
      )
    }

    await connectDB();

    if( !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET ){
      return NextResponse.json(
        { error: "Cloudinary environment variables not configured" },
        { status: 500 }
      )
    }

    const formdata = await request.formData()
    const file = formdata.get("file") as File | null 
    const title = formdata.get("title") as string | null
    const description = formdata.get("description") as string | null
    const originalSizeStr = formdata.get("originalSize") as Number | null;
    const originalSize = originalSizeStr ? originalSizeStr : 0;

    if( !file ){
      return NextResponse.json(
        { error: "File not found" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const promise = await new Promise<CloudinaryUploadResult>(
      ( resolve, reject ) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            resource_type: "video",
            transformation: [
              { quality: "auto" },
              { fetch_format: "mp4" }
            ],
            folder: "saas-video-uploads"
          }, ( error, result ) => {
            if( error ) reject(error)
            else resolve(result as CloudinaryUploadResult)
          }
        )

        uploadStream.end(buffer)
      }
    )

    const video = await Video.create({
      title: title || "No Title",
      description: description || "",
      originalSize: Number(originalSize) || 0,
      userId: String(userId),
      publicId: String(promise.public_id),
      duration: Number(promise.duration) | 0,
    })

    if( !video ){
      return NextResponse.json(
        { error: "Saving Video Failed in db" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { video },
      { status: 201 }
    )

  } catch (error: any) {
    console.log("Error: ", error)
    return NextResponse.json(
      { error: "Upload Video Failed"},
      { status: 500 }
    )
  }
}