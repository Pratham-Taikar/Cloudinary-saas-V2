"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@/types";

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getDownloadUrl = (publicId: string) =>
    getCldVideoUrl({
      src: publicId,
      flags: ["attachment"],
    });

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      rawTransformations: [
        "e_preview:duration_12:max_seg_8:min_seg_dur_1",
        "q_auto:eco",
        "vc_auto",
        "br_500k",
      ],
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      rawTransformations: [
        "q_auto:good", 
        "vc_auto",    
        "br_auto",     
      ],
    });
  }, []);

  const formatSize = useCallback((size: number) => filesize(size), []);

  const formatDuration = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }, []);

  const originalSize = video.originalSize ?? 0;
  const compressedSize = video.compressedSize ?? null;

  const compressionPercentage =
    compressedSize && originalSize > 0
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : null;

  const safeDuration = Number(video.duration) || 0;

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="aspect-video relative overflow-hidden rounded-lg">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-red-500 text-sm">
                Preview not available
              </p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onError={() => setPreviewError(true)}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute bottom-2 right-2 bg-base-100/80 px-2 py-1 rounded-lg text-sm flex items-center">
          <Clock size={16} className="mr-1" />
          {formatDuration(safeDuration)}
        </div>
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold">
          {video.title}
        </h2>

        {video.description && (
          <p className="text-sm text-base-content opacity-70 mb-2">
            {video.description}
          </p>
        )}

        <p className="text-sm text-base-content opacity-70 mb-4">
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FileUp size={18} className="mr-2 text-primary" />
            <div>
              <div className="font-semibold">Original</div>
              <div>{formatSize(originalSize)}</div>
            </div>
          </div>

          <div className="flex items-center">
            <FileDown size={18} className="mr-2 text-secondary" />
            <div>
              <div className="font-semibold">Optimized</div>
              <div className="text-accent">
                Smart 
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm font-semibold">
            Compression:{" "}
            <span className="text-accent font-bold">
              ~70%
            </span>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              onDownload(
                getDownloadUrl(video.publicId),
                video.title
              )
            }
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
