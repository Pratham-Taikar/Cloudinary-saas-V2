"use client";

import React from "react";
import { Sparkles, Wand2, Zap, AlertCircle, Layout } from "lucide-react";

export default function GenerativeBackgroundPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Generative AI Backgrounds</h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          Transform your subject's environment using cutting-edge Generative AI. 
          Simply describe your desired scene, and our engine will synthesize a 
          perfectly matched background in seconds.
        </p>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" /> The Generative Engine
        </h2>
        <p className="text-white/60 leading-relaxed">
          Powered by Cloudinary's <code className="bg-white/10 px-1 rounded text-xs">e_gen_background</code>, 
          this tool uses Stable Diffusion models to create contextually relevant 
          backgrounds. The AI analyzes your subject's lighting and perspective 
          to ensure the generated scene looks natural and integrated.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Prompt Engineering
            </h4>
            <p className="text-xs text-white/50 leading-relaxed">
              Use descriptive keywords like "luxury minimalist office", "sunset 
              beach", or "cinematic forest" for best results.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="font-bold flex items-center gap-2">
              <Layout className="w-4 h-4 text-primary" /> Seamless Integration
            </h4>
            <p className="text-xs text-white/50 leading-relaxed">
              The engine automatically handles subject-to-background blending, 
              preserving shadows and depth of field.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section className="space-y-8">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" /> How to use in App
        </h3>
        <div className="prose prose-invert max-w-none">
          <ol className="text-sm text-white/60 space-y-4 list-decimal ml-6">
            <li>Open the <strong>Generative AI</strong> tool from the sidebar.</li>
            <li>Upload an image with a clear, central subject.</li>
            <li>Enter your prompt in the text field (keep it under 50 characters).</li>
            <li>Click <strong>Generate</strong> and wait for the AI to synthesize the scene.</li>
            <li>Download your high-resolution result.</li>
          </ol>
        </div>
      </section>

      {/* ================= CONSTRAINTS ================= */}
      <section className="p-8 rounded-3xl bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" /> Notes & Constraints
        </h3>
        <ul className="space-y-3 text-sm text-white/60 list-disc ml-6">
          <li><strong>Prompt Limit</strong>: 50 characters maximum.</li>
          <li><strong>Complexity</strong>: Highly complex prompts may take longer to process (up to 10 seconds).</li>
          <li><strong>Plan Quotas</strong>: Each generation counts as one <strong>Image Transformation</strong> credit.</li>
        </ul>
      </section>
    </div>
  );
}
