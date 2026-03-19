"use client";

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">EasyUploads</h1>
        <p className="text-white/70 text-lg max-w-2xl">
          EasyUploads is a stateless media processing platform that enables
          users, creators, developers and teams to transform images and videos
          instantly — without managing storage, infrastructure, or complex
          pipelines.
        </p>
      </div>

      {/* ================= HIGHLIGHTS ================= */}
      <div className="grid sm:grid-cols-1 gap-6">
        {[
          {
            title: `Instant Processing`,
            desc: "Apply transformations in seconds with real-time previews.",
          },
          {
            title: "Smart Compression",
            desc: "Optimize videos and images intelligently based on content.",
          },
          {
            title: "No Storage Required",
            desc: "Stateless architecture — no asset storage or cleanup needed.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-white/5 border border-white/10"
          >
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-white/70">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ================= WHAT IS EASYUPLOADS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What is EasyUploads?</h2>
        <p className="text-white/70 leading-relaxed">
          EasyUploads is designed to simplify media workflows. Instead of
          storing and managing files, the platform processes assets on-demand
          and returns optimized results instantly.
        </p>

        <p className="text-white/70 leading-relaxed">
          Whether you&apos;re building a product, preparing marketing assets, or
          optimizing content for delivery — EasyUploads removes the complexity
          of media handling.
        </p>
      </section>

      {/* ================= CORE CAPABILITIES ================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Core Capabilities</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">Image Processing</h3>
            <p className="text-white/70 text-sm">
              Resize, crop, optimize, and apply advanced filters in a single
              request. Supports modern formats like WebP and AVIF.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg">Background Removal</h3>
            <p className="text-white/70 text-sm">
              Automatically remove backgrounds with high precision — suitable
              for products, portraits, and complex scenes.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg">Video Compression</h3>
            <p className="text-white/70 text-sm">
              Reduce video size significantly while preserving visual quality,
              using smart bitrate and encoding strategies.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg">Generative Backgrounds</h3>
            <p className="text-white/70 text-sm">
              Use AI-based prompts to generate custom backgrounds and enhance
              visuals.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg">Effects & filters</h3>
            <p className="text-white/70 text-sm">
              Use provided effects and filters over the images.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">How it works</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              step: "1. Upload",
              desc: "Send your image or video securely to the platform.",
            },
            {
              step: "2. Configure",
              desc: "Choose transformations like resize, filter, or compression.",
            },
            {
              step: "3. Process",
              desc: "The system processes your media instantly.",
            },
            {
              step: "4. Download",
              desc: "Receive optimized output ready for use.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="font-semibold mb-2">{step.step}</h3>
              <p className="text-sm text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY EASYUPLOADS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why EasyUploads?</h2>

        <ul className="space-y-2 text-white/70 text-sm">
          <li>• No infrastructure setup required</li>
          <li>• Predictable and scalable performance</li>
          <li>• Simplified experience</li>
          <li>• Optimized for modern web applications</li>
        </ul>
      </section>

      {/* ================= CTA ================= */}
      <section className="pt-6 border-t border-white/10">
        <h2 className="text-xl font-semibold mb-3">Ready to get started?</h2>

        <p className="text-white/70 mb-6">
          Explore the Getting Started guide to integrate EasyUploads into your
          workflow.
        </p>

        <a
          href="/docs/getting-started"
          className="inline-block px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
        >
          Get Started →
        </a>
      </section>
    </div>
  );
}
