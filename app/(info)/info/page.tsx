"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function InfoPage() {
  return (
    <div className="relative min-h-screen px-4 py-16">
      {/* background */}
      <>
        <div className="absolute inset-0 -z-10 bg-[#040611]" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(99,102,241,0.15),transparent_25%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_35%)]" />

        <div className="absolute inset-0 -z-10 opacity-[0.08]
  [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
  [background-size:72px_72px]" />
      </>

      <div className="max-w-6xl mx-auto space-y-20">
        {/* HEADER */}
        <section className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
          <Link
            href="/"
            className="btn btn-ghost rounded-xl gap-2 mb-4 hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Platform Capabilities
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            This platform provides fast, on-demand image transformations and
            video compression tools designed for creators, developers, and
            teams who value performance and simplicity.
          </p>
        </section>

        {/* IMAGE TRANSFORMATIONS */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold tracking-tight text-cyan-200">
            Image Transformations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Resize & Aspect Ratio Conversion"
              description="Convert images to predefined social media formats or custom dimensions while preserving visual quality."
              items={[
                "Instagram (1:1, 4:5)",
                "Twitter/X posts and headers",
                "Facebook covers",
                "Custom width and height resizing",
              ]}
            />

            <InfoCard
              title="Smart Cropping"
              description="Automatically crops images using intelligent gravity detection to keep the most important subject in frame."
              items={[
                "Auto subject detection",
                "Face-aware cropping",
                "Center and custom gravity options",
              ]}
            />

            <InfoCard
              title="Quality Optimization"
              description="Images are optimized automatically to reduce file size without visible quality loss."
              items={[
                "Auto quality adjustment",
                "Bandwidth-friendly outputs",
                "Fast loading across devices",
              ]}
            />

            <InfoCard
              title="Format Conversion"
              description="Convert images into modern formats that support better compression and transparency."
              items={[
                "PNG (transparent backgrounds)",
                "Web-friendly optimized formats",
                "Automatic format selection when supported",
              ]}
            />
          </div>
        </section>

        {/* AI IMAGE FEATURES */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold tracking-tight text-cyan-200">
            AI-Powered Image Enhancements
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Background Removal"
              description="Automatically removes image backgrounds using AI segmentation, producing clean transparent outputs."
              items={[
                "Transparent PNG output",
                "Subject-aware edge detection",
                "Ideal for product images & profiles",
              ]}
            />

            <InfoCard
              title="Image Effects & Enhancements"
              description="Apply visual enhancements and effects to improve clarity and appearance."
              items={[
                "Auto enhancement",
                "Color and contrast optimization",
                "Visual clarity improvements",
              ]}
            />
          </div>
        </section>

        {/* VIDEO */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold tracking-tight text-cyan-200">
            Video Compression & Optimization
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Video Upload & Processing"
              description="Upload videos and process them using efficient compression pipelines."
              items={[
                "MP4 optimized output",
                "Fast server-side processing",
                "Compatible across platforms",
              ]}
            />

            <InfoCard
              title="Smart Compression"
              description="Videos are compressed to reduce file size while maintaining acceptable visual quality."
              items={[
                "Automatic bitrate adjustment",
                "Resolution-aware compression",
                "Optimized for streaming & sharing",
              ]}
            />
          </div>
        </section>

        {/* OUTPUT BEHAVIOR */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold tracking-tight text-cyan-200">
            Output & Download Behavior
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Instant Preview"
              description="All transformations are previewed in real time before download."
              items={[
                "No waiting queues",
                "Immediate feedback",
                "Accurate final preview",
              ]}
            />

            <InfoCard
              title="On-Demand Downloads"
              description="Transformed media can be downloaded instantly without persistent storage."
              items={[
                "No stored assets",
                "No long-term data retention",
                "Privacy-friendly processing",
              ]}
            />
          </div>
        </section>

        {/* FOOTNOTE */}
        <section className="text-center">
          <p className="text-sm opacity-60 max-w-3xl mx-auto">
            The platform is intentionally designed for stateless processing.
            Media is transformed on demand and delivered instantly, ensuring
            scalability, performance, and reduced infrastructure overhead.
          </p>
        </section>

        <footer className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Pratham Taikar. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-[0_25px_80px_rgba(0,0,0,.35)]">

      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.15),transparent_35%)]" />

      <div className="relative">

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/20 text-xl">
          ✦
        </div>

        <h3 className="mb-3 text-xl font-bold">
          {title}
        </h3>

        <p className="mb-5 text-sm leading-7 text-white/70">
          {description}
        </p>

        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-white/75"
            >
              <span className="text-cyan-300">✓</span>
              {item}
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}
