"use client";

import React from "react";
import { Sparkles, Zap, ShieldCheck, Download, Wand2 } from "lucide-react";

export default function BackgroundRemovalPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
          AI Background Removal
        </h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          Leverage high-precision neural networks to isolate subjects from their
          backgrounds instantly. Our AI engine handles complex hair,
          transparency, and shadows with industrial accuracy.
        </p>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold">Neural Isolation</h3>
          <p className="text-sm text-white/50 leading-relaxed">
            Using the{" "}
            <code className="bg-white/10 px-1 rounded text-xs">
              e_background_removal
            </code>{" "}
            effect, our system identifies the primary subject and generates a
            high-fidelity alpha mask. This process is optimized for e-commerce,
            portraits, and product photography.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold">Real-time Preview</h3>
          <p className="text-sm text-white/50 leading-relaxed">
            Our stateless architecture allows you to preview the removal results
            in real-time before committing to a download. This ensures you get
            the perfect result every time without wasting processing credits.
          </p>
        </div>
      </section>

      {/* ================= USAGE ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-primary" /> Application Workflow
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-3">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h4 className="font-bold">Upload</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Select any high-res image from your device.
            </p>
          </div>
          <div className="space-y-3">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h4 className="font-bold">Process</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Our AI engine analyzes and isolates the subject in seconds.
            </p>
          </div>
          <div className="space-y-3">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
              3
            </span>
            <h4 className="font-bold">Download</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Export as a transparent PNG ready for any design.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LIMITS ================= */}
      <section className="p-8 rounded-3xl bg-black/40 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" /> Best Results
            </h3>
            <p className="text-sm text-white/60">
              For optimal isolation, ensure your subject has clear contrast with
              the background.
            </p>
          </div>
          <a
            href="/remove-background"
            className="px-6 py-3 rounded-xl bg-primary text-primary-content font-bold flex items-center gap-2 hover:opacity-90 transition-all whitespace-nowrap"
          >
            Try Background Removal <Download className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
