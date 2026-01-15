"use client";

import React, { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";

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
  const imageRef = React.useRef<HTMLImageElement>(null);

  const [filterFormat, setFilterFormat] =
    useState<FilterFormat>("alDente");
  const [effectFormat, setEffectFormat] =
    useState<EffectFormat>("cartoonify");

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    setIsTransforming(true)
  }, [uploadedImage, filterFormat, effectFormat])

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      setImageSize({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/image-upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload image");

        const data = await response.json();
        setUploadedImage(data.publicId);
        setIsTransforming(true);

      } catch (error) {
        console.error(error);
        alert("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    };
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filterFormat.replace(/\s+/g, "_").toLowerCase()}_${effectFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Add Image Effects
      </h1>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>

          <input
            type="file"
            onChange={handleFileUpload}
            className="file-input file-input-bordered file-input-primary w-full"
          />

          {isUploading && (
            <progress className="progress progress-primary w-full mt-4" />
          )}

          {uploadedImage && imageSize && (
            <div className="mt-6">

              <h2 className="card-title mb-4 ">Select Filter</h2>

              <select
                className="select select-bordered w-full"
                value={filterFormat}
                onChange={(e) =>
                  setFilterFormat(e.target.value as FilterFormat)
                }
              >
                {Object.keys(Filters).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              <h2 className="card-title mb-4 mt-4">Select Effect</h2>
              <select
                className="select select-bordered w-full"
                value={effectFormat}
                onChange={(e) =>
                  setEffectFormat(e.target.value as EffectFormat)
                }
              >
                {Object.keys(Effects).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid">
                    <h2>Original: </h2>
                    <CldImage
                      ref={imageRef}
                      src={uploadedImage}
                      width={imageSize.width}
                      height={imageSize.height}
                      crop="fill"
                      gravity="auto"
                      quality="auto"
                      alt="Transformed preview"
                    />
                  </div>
                  <div className="grid">
                    {isTransforming && (
                      <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                        <span className="loading loading-spinner loading-lg"></span>
                      </div>
                    )}
                    <h2>Transformed:</h2>
                    <CldImage
                      ref={imageRef}
                      src={uploadedImage}
                      width={imageSize.width}
                      height={imageSize.height}
                      crop="fill"
                      gravity="auto"
                      quality="auto"
                      alt="Transformed preview"
                      effects={[
                        ...(filterFormat !== "none"
                          ? [{ art: Filters[filterFormat] }]
                          : []),

                        ...(effectFormat !== "none"
                          ? [{ [Effects[effectFormat]]: true }]
                          : []),
                      ]}
                      onLoad={() => setIsTransforming(false)}
                    />
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary" onClick={handleDownload}>
                  Download for {filterFormat}_{effectFormat}
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
