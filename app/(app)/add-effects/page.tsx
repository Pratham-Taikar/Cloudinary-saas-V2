"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import toast from "react-hot-toast";

const Filters = {
  none: "none",
  alDente: "al_dente",
  athena: "athena",
  audrey: "audrey",
  aurora: "aurora",
  daguerre: "daguerre",
  eucalyptus: "eucalyptus",
  fes: "fes",
  frost: "frost",
  hokusai: "hokusai",
  incognito: "incognito",
  linen: "linen",
  peacock: "peacock",
  primrose: "primrose",
  quartz: "quartz",
  redRock: "red_rock",
  refresh: "refresh",
  sizzle: "sizzle",
  sonnet: "sonnet",
  ukulele: "ukulele",
  zorro: "zorro",
};

type FilterFormat = keyof typeof Filters;

const Effects = {
  none: "none",
  cartoonify: "cartoonify",
  vectorize: "vectorize",
  oilPaint: "oil_paint",
  watercolor: "watercolor",
  sepia: "sepia",
  grayscale: "grayscale",
  blackwhite: "blackwhite",
  negate: "negate",
};

type EffectFormat = keyof typeof Effects;

function AddEffects() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

  const [filterFormat, setFilterFormat] = useState<FilterFormat>("alDente");
  const [effectFormat, setEffectFormat] = useState<EffectFormat>("cartoonify");

  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
  const MAX_PIXELS = 25_000_000; // 25 Megapixels

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [uploadedImage, filterFormat, effectFormat]);

  const resetInputState = () => {
    setUploadedImage(null);
    setImageSize(null);
    setIsTransforming(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size too large. Max allowed size is 25 MB.");
      resetInputState();
      return;
    }

    setIsUploading(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const width = img.width;
      const height = img.height;
      const totalPixels = width * height;
      URL.revokeObjectURL(img.src);

      if (totalPixels > MAX_PIXELS) {
        toast.error(
          `Image resolution too large (${Math.round(
            totalPixels / 1_000_000
          )} MP). Please upload an image under 25 MP.`
        );
        resetInputState();
        setIsUploading(false);
        return;
      }

      setImageSize({ width, height });

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
        toast.success("Image uploaded");
      } catch {
        toast.error("Failed to upload image");
        resetInputState();
      } finally {
        setIsUploading(false);
      }
    };

    img.onerror = () => {
      toast.error("Invalid image file");
      resetInputState();
      setIsUploading(false);
    };
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filterFormat}_${effectFormat}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Image Effects</h1>

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

          {isUploading && <progress className="progress progress-primary w-full mt-4" />}

          {uploadedImage && imageSize && (
            <>
              <h2 className="card-title mt-6">Select Filter</h2>

              <select
                className="select select-bordered w-full"
                value={filterFormat}
                onChange={(e) => setFilterFormat(e.target.value as FilterFormat)}
              >
                {Object.keys(Filters).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              <h2 className="card-title mt-4">Select Effect</h2>

              <select
                className="select select-bordered w-full"
                value={effectFormat}
                onChange={(e) => setEffectFormat(e.target.value as EffectFormat)}
              >
                {Object.keys(Effects).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              <div className="mt-6 relative">
                {isTransforming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <CldImage
                    src={uploadedImage}
                    width={imageSize.width}
                    height={imageSize.height}
                    crop="fill"
                    quality="auto"
                    alt="Original"
                  />

                  <CldImage
                    ref={imageRef}
                    src={uploadedImage}
                    width={imageSize.width}
                    height={imageSize.height}
                    crop="fill"
                    quality="auto"
                    alt="Transformed"
                    effects={[
                      ...(filterFormat !== "none" ? [{ art: Filters[filterFormat] }] : []),
                      ...(effectFormat !== "none" ? [{ [Effects[effectFormat]]: true }] : []),
                    ]}
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>

                <div className="card-actions justify-end mt-6">
                  <button className="btn btn-primary" onClick={handleDownload}>
                    Download
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEffects;
