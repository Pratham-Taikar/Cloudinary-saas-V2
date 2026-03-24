"use client";

import React from "react";
import { Zap, Shield, Globe, Cpu, Layers, Sparkles } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
            Platform Overview
          </h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
            EasyUploads is an enterprise-grade, stateless media processing SaaS
            engineered for the modern web. We provide a high-performance
            infrastructure for real-time image and video transformations,
            eliminating the complexity of traditional media pipelines.
          </p>
        </div>
      </section>

      {/* ================= CORE VALUE PROPOSITION ================= */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Stateless Architecture",
            desc: "Zero persistent storage for processed assets. Every transformation is generated on-demand and delivered via global CDN edges.",
            icon: Globe,
            color: "text-blue-400",
          },
          {
            title: "AI-Driven Intelligence",
            desc: "Leveraging advanced neural networks for background removal, generative fill, and content-aware optimization.",
            icon: Sparkles,
            color: "text-purple-400",
          },
          {
            title: "Enterprise Security",
            desc: "End-to-end encryption with Clerk-powered identity management and multi-tenant isolation.",
            icon: Shield,
            color: "text-green-400",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300"
          >
            <item.icon
              className={`w-10 h-10 ${item.color} mb-6 group-hover:scale-110 transition-transform`}
            />
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ================= TECHNICAL DEPTH ================= */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <Layers className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">The Processing Engine</h2>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 text-lg leading-relaxed">
            At its core, EasyUploads utilizes a virtualized "Processing Unit"
            that abstracts Cloudinary's powerful transformation API. This
            architecture allows for <strong>infinite horizontal scaling</strong>{" "}
            without the overhead of local server computation.
          </p>

          <div className="grid sm:grid-cols-2 gap-10 mt-10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" /> Image Intelligence
              </h3>
              <p className="text-white/60 text-sm">
                From simple resizing to complex AI background removal and
                generative fill, our engine processes requests in sub-second
                latency. We support 50+ transformations across all modern
                formats including WebP, AVIF, and HEIC.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Video Optimization
              </h3>
              <p className="text-white/60 text-sm">
                Our smart compression algorithms analyze video entropy to
                determine the optimal bitrate, ensuring the highest visual
                quality at the lowest possible file size—perfect for web
                delivery and mobile performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUBSCRIPTION LIFECYCLE ================= */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
        <h2 className="text-2xl font-bold mb-4">Subscription Lifecycle</h2>
        <p className="text-white/70 mb-6 leading-relaxed">
          We implement an automated, 30-day billing and credit lifecycle. Usage
          quotas are reset automatically upon your billing anniversary,
          providing a seamless "always-on" experience for production
          environments.
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
            Monthly Credit Reset
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
            Graceful Plan Expiry
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
            Razorpay Verified Transactions
          </span>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pt-10 text-center border-t border-white/10">
        <h2 className="text-2xl font-bold mb-4">Ready to Integrate?</h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">
          Start building today with our developer-first documentation and robust
          API.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/docs/getting-started"
            className="px-8 py-4 rounded-xl bg-primary text-primary-content font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            Get Started
          </a>
          <a
            href="/docs/api-reference"
            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all"
          >
            API Reference
          </a>
        </div>
      </section>
    </div>
  );
}
