"use client";

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LimitReached from "@/components/limitValidator";
import services, { type PlanKey } from "@/lib/services";

interface User {
  userId: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  imageCount: number;
  videoCount: number;
  plan: PlanKey;
}

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [checkingLimit, setCheckingLimit] = useState(true);


  const router = useRouter();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data);
      } catch {
        toast.error("Failed to load user");
      } finally {
        setCheckingLimit(false);
      }
    };

    fetchUser();
  }, []);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; //10mb

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUploading) return;

    if (!file) {
      toast.error("Please select a video file");
      return;
    }

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size is too large (Max 10MB)");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setIsUploading(true);

    if (!cloudName || !cloudinaryApiKey) {
      toast.error("Video upload is not configured");
      setIsUploading(false);
      return;
    }

    try {
      const signatureResponse = await axios.post("/api/video-upload/signature");
      const { timestamp, signature, folder } = signatureResponse.data as {
        timestamp: number;
        signature: string;
        folder: string;
      };

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("api_key", cloudinaryApiKey);
      cloudinaryFormData.append("timestamp", String(timestamp));
      cloudinaryFormData.append("signature", signature);
      cloudinaryFormData.append("folder", folder);

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        cloudinaryFormData,
        {
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;

            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(Math.min(percent, 95));
          },
        }
      );

      const uploadedVideo = uploadResponse.data as {
        public_id: string;
        bytes?: number;
        duration?: number;
      };

      await axios.post("/api/video-upload", {
        title: title.trim(),
        description: description.trim(),
        publicId: uploadedVideo.public_id,
        originalSize: file.size,
        compressedSize: uploadedVideo.bytes || 0,
        duration: uploadedVideo.duration || 0,
      });

      setUploadProgress(100);

      toast.success("Video uploaded successfully");
      router.push("/home");
    } catch (error) {
      console.error(error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || "Failed to upload video"
        : "Failed to upload video";
      toast.error(message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (checkingLimit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    const plan = services[user.plan] || services.free;

    if (user.videoCount >= plan.videoLimit) {
      return (
        <LimitReached
          type="video"
          used={user.videoCount}
          limit={plan.videoLimit}
          plan={user.plan}
        />
      );
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Upload Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Video File</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            disabled={isUploading}
            accept="video/mp4,video/webm,video/ogg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {isUploading && (
          <div className="space-y-1">
            <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Uploading… {uploadProgress}%
            </p>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
