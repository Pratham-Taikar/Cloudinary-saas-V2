"use client";

import React from "react";
import Link from "next/link";
import { UploadCloud, Settings, Zap, Download, ArrowRight } from "lucide-react";

function GettingStarted() {
  return (
    <div className="space-y-12">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Getting Started</h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Follow these simple steps to start transforming your media using
          EasyUploads. No complex setup required — just upload, process, and
          download.
        </p>
      </div>

      {/* ================= STEPS ================= */}
      <div className="space-y-6">
        {/* STEP 1 */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <UploadCloud className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">1. Upload Media</h2>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Upload your image or video file securely through the platform.
            Supported formats include JPEG, PNG, WebP, MP4, and more.
          </p>
        </div>

        {/* STEP 2 */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Settings className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">
              2. Configure Transformations
            </h2>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Choose the transformations you need — resize, crop, apply filters,
            remove backgrounds, or compress videos. You can combine multiple
            operations in a single request.
          </p>
        </div>

        {/* STEP 3 */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">3. Instant Processing</h2>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Your media is processed instantly using our stateless engine. No
            storage, no delays — just fast and reliable output.
          </p>
        </div>

        {/* STEP 4 */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Download className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">4. Download Result</h2>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Download your optimized media instantly or use the generated output
            in your applications or workflows.
          </p>
        </div>
      </div>

      {/* ================= QUICK EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Example</h2>

        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-white/80">
          {`POST /api/image-upload

{
  "file": "image.png",
  "transformations": [
    "resize:800x600",
    "format:png"
  ]
}`}
        </div>

        <p className="text-white/60 text-sm">
          This example resizes an image and converts it into WebP format.
        </p>
      </section>

      {/* ================= NEXT STEPS ================= */}
      <section className="pt-6 border-t border-white/10">
        <h2 className="text-xl font-semibold mb-3">Next Steps</h2>

        <p className="text-white/70 mb-6">
          Explore more features and advanced configurations in the
          documentation.
        </p>

        <Link
          href="/docs/overview"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
        >
          Go to Overview
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

export default GettingStarted;
