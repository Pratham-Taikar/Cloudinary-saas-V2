"use client";

import React, { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import toast from "react-hot-toast";

function AddEffects() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState("")

  const MAX_PIXELS = 25_000_000;

  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    setIsTransforming(true)
  }, [uploadedImage])

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const name = file.name.slice(0, file.name.lastIndexOf("."))
    setFileName(name)

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      setImageSize({ width: img.width, height: img.height });
      const width = img.width;
      const height = img.height
      const totalPixels = width * height
      URL.revokeObjectURL(img.src);

      if( totalPixels > MAX_PIXELS ){
        setIsUploading(false);

        toast.error(`Image resolution too large (${Math.round(totalPixels / 1_000_000)
          } MP). Please upload an image under 25 MP.`);

        setFileName("");
        setImageSize(null);

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

        toast.success("Image uploaded")

      } catch (error) {
        console.error(error);
        toast.error("Failed to upload image")
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
        link.download = `${fileName}_background-removed.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Remove Background from Image
      </h1>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>

          <input
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
                      restore={true}
                      gravity="auto"
                      quality="auto"
                      removeBackground={true}
                      alt="Transformed preview"
                      onLoad={() => setIsTransforming(false)}
                    />
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary" onClick={handleDownload}>
                  Download
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
