"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import services from "@/lib/services";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const text = "EASYUPLOADS";
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const letterTimer = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev < text.length) return prev + 1;
        return prev;
      });
    }, 235);

    const exitTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearInterval(letterTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinish, text.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden text-white">

      <div className="absolute inset-0">
        <div className="absolute -inset-[30%] animate-wave-slow bg-[radial-gradient(circle_at_20%_20%,#3b82f6,transparent_40%)]" />
        <div className="absolute -inset-[30%] animate-wave-medium bg-[radial-gradient(circle_at_80%_30%,#60a5fa,transparent_40%)]" />
        <div className="absolute -inset-[30%] animate-wave-fast bg-[radial-gradient(circle_at_50%_80%,#1d4ed8,transparent_40%)]" />
      </div>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl z-30" />

      <div className="relative z-40 flex gap-1 sm:gap-2 text-2xl sm:text-6xl tracking-[0.35em] font-semibold">
        {text.split("").map((char, index) => {
          const isVisible = index < visibleLetters;
          const isActive = index === visibleLetters - 1;

          return (
            <span
              key={index}
              className={`transition-all duration-300 ease-out
                ${isVisible ? "opacity-100" : "opacity-0"}
                ${isActive ? "scale-250 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "scale-100"}`}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ================= LANDING PAGE ================= */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden animate-fade-in">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <img src="/saaslogo.png" alt="weblogo" className="sm:w-50 w-36" />

          <div className="flex gap-3">
            <Link href="/billings" className="btn btn-primary btn-sm">
              Pricing
            </Link>
            <Link href="/info" className="btn btn-outline btn-sm">
              Capabilities
            </Link>
          </div>
        </div>
      </header>


      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          Transform Images & Videos <br />
          <span className="text-primary">Instantly. At Scale.</span>
        </h1>

        <p className="mt-6 text-sm sm:text-lg opacity-75 max-w-3xl mx-auto">
          A modern SaaS platform to transform images and videos instantly.
          No clutter. No storage overhead. Just fast, reliable processing
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/sign-in" className="btn btn-primary px-8">
            Start for Free
          </Link>
          <Link href="/billings" className="btn btn-outline px-8">
            View Pricing
          </Link>
          <Link href="/docs/overview" className="btn btn-outline px-8">
            Docs
          </Link>
        </div>
      </section>

      {/* ================= WHAT IT DOES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">What this platform does</h2>
          <p className="mt-4 text-sm sm:text-lg opacity-70 max-w-2xl mx-auto">
            The platform focuses on real-time media transformations —
            helping you prepare images and videos exactly how you need them,
            without storing unnecessary assets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Background Removal",
              desc: "AI-powered subject separation with pixel-level accuracy.",
            },
            {
              title: "Image Filters",
              desc: "Professional filters, contrast, sharpen, and more.",
            },
            {
              title: "Resize & Optimize",
              desc: "Smart resizing with WebP & AVIF optimization.",
            },
            {
              title: "Video Compression",
              desc: "Reduce size up to 80% without quality loss.",
            },
            {
              title: "On-Demand Processing",
              desc: "No storage — process only when needed.",
            },
            {
              title: "Generate Background Using Creativity",
              desc: "Prompt based generative AI background",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32 space-y-32">
        <div className="grid md:grid-cols-2 gap-12 items-center
        bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-xl">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">
              Effects over Images
            </h2>
            <p className="text-sm sm:text-base opacity-75 leading-relaxed mb-4">
              Add effects to images, get them modified with multiple effects and filters provided.
            </p>
            <p className="text-sm sm:text-base opacity-75 leading-relaxed">
              Just upload and get results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden">
              <img
                src="/effect_original.png"
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <img
                src="/effect_transformed.png"
                alt="Transformed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center
        bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden">
              <img
                src="/background_original.png"
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <img
                src="/background_removed.png"
                alt="Background Removed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-4xl text-right font-bold mb-6">
              Background Removal
            </h2>
            <p className="text-sm sm:text-base opacity-75 text-right leading-relaxed mb-4">
              Generate clean, and clear background removed images.
            </p>
            <p className="text-sm sm:text-base opacity-75 text-right leading-relaxed">
              Perfect for product photos, profile images, and marketing assets.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center
        bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-xl">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">
              Generative Background
            </h2>
            <p className="text-sm sm:text-base opacity-75 leading-relaxed mb-4">
              Use your creativity to generate background with prompting.
            </p>
            <p className="text-sm sm:text-base opacity-75 leading-relaxed">
              Different prompts, different results.
            </p>
            <p className="sm:mt-4 sm:border sm:w-fit sm:px-4 sm:py-2 sm:border-yellow-600 sm:text-white sm:rounded-full font-semibold text-yellow-600 sm:text-base text-sm mt-2">
              Prompt: Teddy bears arranged on shelf.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden">
              <img
                src="/ai_original.png"
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <img
                src="/ai_tranformedpng.png"
                alt="Transformed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 p-8 sm:p-6 lg:p-10 rounded-xl">

          <div className="w-full flex justify-center">
            <div className="w-full sm:w-[80%] md:w-full max-w-md overflow-hidden rounded-xl">
              <img
                src="https://aicdn.picsart.com/766a2cc1-e87a-4fbd-a3a6-6ac843813705.png"
                alt="Video compression"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Video Compression
            </h2>

            <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-3 sm:mb-4 max-w-xl mx-auto md:mx-0">
              Helps in decreasing video size just by uploading. Get on-the-go video compression.
            </p>

            <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-xl mx-auto md:mx-0">
              Video compressing smartly based on the content and quality.
            </p>
          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-10">
          How it works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            {
              title: "Media",
              desc: "Upload videos or images securely with support for high-resolution files."
            },
            {
              title: "Processing",
              desc: "video compression or image transformations like resize, crop, and format change."
            },
            {
              title: "Preview",
              desc: "Preview results in real time before exporting — no waiting, no guesswork."
            },
            {
              title: "Download",
              desc: "Download optimized media ready for web, apps, or social platforms."
            }
          ].map((step, i) => (
            <div key={i} className="space-y-4 rounded-2xl p-8 hover:bg-white/10 hover:dark:bg-black/20 backdrop-blur-x">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <p className="font-medium">{step.title}</p>
              <p className="text-sm opacity-80 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          Start 
          <span className="text-primary"> Transforming </span> 
          Today
        </h1>

        <Link
          href="/"
          className="mt-10 btn btn-primary rounded-xl p-4"
        >
          Go to Dashboard
        </Link>
      </section>

      <footer className="w-full mt-20 border-t border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/70 text-center md:text-left">
              © {new Date().getFullYear()} Pratham. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
              <a href="/docs/overview" className="hover:text-white transition">
                Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
