"use client";

import React, { useEffect, useState } from "react";
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

function GenerateBackground() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [backgroundEffect, setBackgroundEffect] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [transformKey, setTransformKey] = useState(0);
  const [isReuploading, setIsReuploading] = useState(false);
  const [fileName, setFileName] = useState("")
  const [inputLength, setInputLength] = useState<number>(0)
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [checkingLimit, setCheckingLimit] = useState(true);

  const MAX_PIXELS = 25_000_000;

  const imageRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (hasGenerated && !isTransforming) {
      setHasGenerated(false);
    }
  }, [backgroundEffect]);

  useEffect(() => {
    setHasGenerated(false);
    setIsTransforming(false);
    setTransformKey(0);
  }, [uploadedImage]);

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

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setIsReuploading(true);
    setHasGenerated(false);
    setBackgroundEffect(null);

    const name = file.name.slice(0, file.name.lastIndexOf("."));
    setFileName(name);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      setImageSize({ width: img.width, height: img.height });
      const width = img.width;
      const height = img.height;
      const totalPixels = width * height;
      URL.revokeObjectURL(img.src);

      if (totalPixels > MAX_PIXELS) {
        setIsUploading(false);

        toast.error(`Image resolution too large (${Math.round(totalPixels / 1_000_000)
          } MP). Please upload an image under 25 MP.`);

        setFileName("");
        setImageSize(null);
        setIsReuploading(false);
        setBackgroundEffect(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/image-upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          toast.error("Failed to upload image")
          throw new Error("Failed to upload image")
        };

        const data = await response.json();
        setUploadedImage(data.publicId);
        setIsTransforming(true);

        toast.success("Image uploaded")
      } catch {
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
        setIsReuploading(false);
      }
    };
  };

  const backgroundGeneration = () => {
    if (!backgroundEffect || !uploadedImage) return;
    setIsTransforming(true);
    setHasGenerated(true);
    setTransformKey((prev) => prev + 1);
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}_generated.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
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
        Generate background using AI
      </h1>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>

          <input
            type="file"
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="file-input file-input-bordered file-input-primary w-full"
          />

          {isUploading && (
            <progress className="progress progress-primary w-full mt-4" />
          )}

          {uploadedImage && imageSize && (
            <div className="mt-6">
              {!isReuploading && (
                <>
                  <h2 className="card-title mb-4 ">
                    Generate Background with prompt
                  </h2>

                  <input
                    type="text"
                    placeholder="Enter background prompt (e.g. modern office)"
                    className="input input-bordered w-full mt-4"
                    onChange={(e) => {
                      setInputLength(e.target.value.length);
                      setBackgroundEffect(
                        e.target.value && e.target.value.length <= 50
                          ? `gen_background_replace:${e.target.value}`
                          : null
                      );
                    }}
                  />
                  {inputLength > 50 && (
                    <p className="mt-2 text-red-500 font-bold">Prompt exceeds 50 characters</p>
                  )}
                  <p className="mt-2 text-gray-400 text-right">Max limit: 50 characters</p>

                  {!hasGenerated && (
                    <button
                      className="mt-3 btn btn-primary"
                      onClick={backgroundGeneration}
                      disabled={!backgroundEffect}
                    >
                      Generate
                    </button>
                  )}
                </>
              )}


              {hasGenerated && uploadedImage && (
                <div className="mt-6 relative">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-2">Preview:</h3>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid">
                      <h2 className="font-semibold">Original:</h2>
                      <CldImage
                        src={uploadedImage}
                        width={Math.min(imageSize.width, 2048)}
                        height={Math.min(imageSize.height, 2048)}
                        crop="limit"
                        gravity="auto"
                        quality="auto"
                        alt="Original"
                      />
                    </div>

                    <div className="grid">
                      <h2 className="font-semibold">Transformed:</h2>
                      <CldImage
                        src={uploadedImage}
                        width={Math.min(imageSize.width, 2048)}
                        height={Math.min(imageSize.height, 2048)}
                        crop="limit"
                        gravity="auto"
                        quality="auto"
                        removeBackground
                        restore
                        background="transparent"
                        format="png"
                        alt="Generated image"
                      />
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      className="btn btn-primary"
                      onClick={handleDownload}
                      disabled={isTransforming}
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateBackground;