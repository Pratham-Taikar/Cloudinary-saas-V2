import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/models/user.models";

export const runtime = "nodejs";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FREE_IMAGES = 10;

export async function POST(request: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();

        const user = await User.findOne({ userId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.isSubscribed && user.imageCount >= MAX_FREE_IMAGES) {
            return NextResponse.json(
                { error: "Image limit reached. Upgrade required." },
                { status: 403 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const result: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "saas-image-uploads" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { $inc: { imageCount: 1 } },
            { new: true }
        );

        return NextResponse.json(
            {
                publicId: result.public_id,
                user: updatedUser,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Upload image failed" },
            { status: 500 }
        );
    }
}
