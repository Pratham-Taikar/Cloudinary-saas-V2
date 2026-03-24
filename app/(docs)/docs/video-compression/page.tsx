"use client";

import React from "react";
import { Play, Cpu, Zap, Settings, ShieldCheck } from "lucide-react";

export default function VideoCompressionPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Smart Video Compression</h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          Our intelligent video engine analyzes every frame to deliver the 
          perfect balance between file size and visual fidelity. Perfect for 
          web delivery where every kilobyte counts.
        </p>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary" /> The Compression Algorithm
        </h2>
        <p className="text-white/60 leading-relaxed max-w-2xl">
          EasyUploads uses content-aware encoding to compress videos on-the-fly. 
          By dynamically adjusting bitrates based on scene complexity, we achieve 
          up to <strong>70% reduction in file size</strong> without human-perceivable 
          quality loss.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold mb-1">Dynamic Bitrate</h4>
              <p className="text-xs text-white/50">Automatically scales bitrate based on motion intensity.</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex-shrink-0 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="font-bold mb-1">Format Normalization</h4>
              <p className="text-xs text-white/50">Converts all uploads to web-optimized MP4/H.264 automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARAMETERS ================= */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" /> Technical Parameters
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-sm text-white/70">
            Behind the scenes, we apply the following Cloudinary transformations to every video upload:
          </p>
          <ul className="text-sm text-white/50 space-y-2 list-disc ml-6">
            <li><code className="bg-white/10 px-1 rounded text-xs">q_auto</code>: Intelligent quality selection.</li>
            <li><code className="bg-white/10 px-1 rounded text-xs">vc_h264</code>: Universal codec compatibility.</li>
            <li><code className="bg-white/10 px-1 rounded text-xs">br_auto</code>: Automatic bitrate optimization.</li>
            <li><code className="bg-white/10 px-1 rounded text-xs">f_mp4</code>: Standard web-delivery format.</li>
          </ul>
        </div>
      </section>

      {/* ================= USAGE ================= */}
      <section className="p-8 rounded-3xl bg-black/40 border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-primary" /> How to use in App
        </h3>
        <ol className="space-y-4 text-sm text-white/60 list-decimal ml-6">
          <li>Navigate to the <strong>Video Dashboard</strong> from your sidebar.</li>
          <li>Click on <strong>Upload Video</strong> and select your raw asset.</li>
          <li>Once uploaded, the system will automatically process and compress the file.</li>
          <li>View your optimized video and compare sizes directly in your dashboard.</li>
        </ol>
      </section>
    </div>
  );
}
