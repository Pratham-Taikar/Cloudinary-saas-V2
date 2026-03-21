"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
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

function AddEffects() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  const originalRef = useRef<HTMLImageElement>(null);
  const transformedRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [checkingLimit, setCheckingLimit] = useState(true);

  const MAX_PIXELS = 25_000_000;

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const name = file.name.slice(0, file.name.lastIndexOf("."));
    setFileName(name);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const width = img.width;
      const height = img.height;
      const totalPixels = width * height;

      setImageSize({ width, height });
      URL.revokeObjectURL(img.src);

      if (totalPixels > MAX_PIXELS) {
        setIsUploading(false);
        toast.error(
          `Image resolution too large (${Math.round(
            totalPixels / 1_000_000
          )} MP). Please upload under 25 MP.`
        );

        setFileName("");
        setImageSize(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/image-upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        setUploadedImage(data.publicId);
        setIsTransforming(true);
        toast.success("Image uploaded");
      } catch {
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    };
  };

  const handleDownload = () => {
    if (!transformedRef.current) return;

    fetch(transformedRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `background-removed.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
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

    if (user.imageCount >= plan.imageLimit) {
      return (
        <LimitReached
          type="image"
          used={user.imageCount}
          limit={plan.imageLimit}
          plan={user.plan}
        />
      );
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Remove Background from Image
      </h1>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-input file-input-bordered file-input-primary w-full"
          />

          {isUploading && (
            <progress className="progress progress-primary w-full mt-4" />
          )}

          {uploadedImage && imageSize && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Preview:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-2">Original</h4>
                  <CldImage
                    ref={originalRef}
                    src={uploadedImage}
                    width={imageSize.width}
                    height={imageSize.height}
                    crop="fit"
                    gravity="auto"
                    quality="auto"
                    alt="Original"
                  />
                </div>

                <div className="relative">
                  <h4 className="mb-2">Transformed</h4>

                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-100/60 z-10">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  )}

                  <CldImage
                    ref={transformedRef}
                    src={uploadedImage}
                    width={imageSize.width}
                    height={imageSize.height}
                    crop="fit"
                    gravity="auto"
                    quality="auto"
                    removeBackground
                    background="none"
                    format="png"
                    alt="Background removed"
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary" onClick={handleDownload}>
                  Download PNG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEffects;
