"use client";

import React from "react";
import { Layers, Image as ImageIcon, Share2, Sparkles, Wand2 } from "lucide-react";

export default function ImageProcessingPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Image Processing</h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          Our image engine combines Cloudinary's dynamic transformation API with 
          proprietary processing logic to deliver high-fidelity results at scale. 
          Every request is optimized for sub-second delivery via global edge nodes.
        </p>
      </section>

      {/* ================= CORE TOOLS ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-primary" /> Core Transformation Tools
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-primary/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Effects & Filters</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Apply complex visual shaders including <code className="bg-white/10 px-1 rounded text-xs">cartoonify</code>, 
              <code className="bg-white/10 px-1 rounded text-xs">sepia</code>, and <code className="bg-white/10 px-1 rounded text-xs">grayscale</code>. 
              Our engine uses content-aware filters that preserve skin tones and texture.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-primary/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Social Intelligence</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Automated aspect-ratio matching for Instagram (1:1), Twitter (16:9), and 
              Facebook. We use <code className="bg-white/10 px-1 rounded text-xs">c_fill</code> and 
              <code className="bg-white/10 px-1 rounded text-xs">g_auto</code> to ensure the primary 
              subject is never cropped out.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TECHNICAL SPECIFICATIONS ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <Layers className="w-6 h-6 text-primary" /> Technical Specs
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Max Resolution</span>
            <span className="text-2xl font-bold text-white/90">25 MP</span>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">File Size Limit</span>
            <span className="text-2xl font-bold text-white/90">10 MB</span>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">Edge Delivery</span>
            <span className="text-2xl font-bold text-white/90">&lt; 200ms</span>
          </div>
        </div>
      </section>

      {/* ================= BEST PRACTICES ================= */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" /> Optimization Tips
        </h3>
        <ul className="space-y-3 text-sm text-white/60 list-disc ml-6">
          <li>Use <strong>WebP</strong> for the best balance of quality and file size.</li>
          <li>Combine multiple transformations in one request to reduce latency.</li>
          <li>Leverage <code className="bg-white/10 px-1 rounded text-xs">f_auto</code> for automatic format selection based on browser support.</li>
        </ul>
      </section>
    </div>
  );
}
