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
    }, 150);

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

      <div className="relative z-40 text-lg sm:text-4xl tracking-[0.35em] font-semibold">
        {text.slice(0, visibleLetters)}
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
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 dark:bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/weblogo-removebg-preview.png"
              alt="EasyUploads Logo"
              width={36}
              height={36}
              className="shrink-0"
            />
            <span className="text-base sm:text-lg font-semibold tracking-wide">
              EasyUploads
            </span>
          </div>

          <Link
            href={"/info"}
            className="sm:inline-flex btn btn-outline btn-sm rounded-xl px-5"
          >
            What’s more
          </Link>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-2xl sm:text-5xl font-bold tracking-tight">
          Simple. Powerful. Media Processing.
        </h1>

        <p className="mt-6 text-sm sm:text-lg opacity-75 max-w-3xl mx-auto">
          A modern SaaS platform to transform images and videos instantly.
          No clutter. No storage overhead. Just fast, reliable processing
          built for creators, developers, and teams.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/sign-in" className="btn btn-primary rounded-xl px-4 sm:px-8">
            Get Started
          </Link>
          <Link href="/billing" className="btn btn-outline rounded-xl px-4 sm:px-8">
            View Pricing
          </Link>
        </div>

        <p className="mt-8 inline-block px-5 py-2 text-xs sm:text-sm 
text-white/80 bg-white/10 dark:bg-black/20 
backdrop-blur-xl border border-white/20 
rounded-full shadow-sm">
          Fast and predictable media workflows
        </p>
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
              title: "Image Transformations",
              desc: "Resize, crop, optimize, remove backgrounds, and more such image transformations.",
            },
            {
              title: "Video Optimization",
              desc: "Upload and compress videos with smart quality presets optimized for speed and compatibility.",
            },
            {
              title: "On-demand Processing",
              desc: "Assets are processed only when required — no persistent storage, no clutter.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm opacity-75">{item.desc}</p>
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
                src="/original.png"
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <img
                src="/tranformed.png"
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
                src="/dog.jpg"
                alt="Original dog"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <img
                src="/dog-bg-remove.png"
                alt="Background removed"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center
bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 
p-4 sm:p-6 lg:p-10 rounded-xl">

          <div className="text-center md:text-left">
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

          <div className="w-full flex justify-center">
            <div className="w-full sm:w-[80%] md:w-full max-w-md overflow-hidden rounded-xl">
              <img
                src="/video.png"
                alt="Video compression"
                className="w-full h-auto object-cover"
              />
            </div>
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

      {/* ================= WHY THIS ARCHITECTURE ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-10">
        <h2 className="text-3xl font-bold text-center">
          Built for performance and clarity
        </h2>

        <p className="text-base opacity-75 max-w-3xl mx-auto text-center">
          This platform is not a media storage system. It is a fast,
          stateless processing engine designed to keep costs low,
          performance high, and workflows predictable.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            "No unnecessary media storage",
            "Scales efficiently with demand",
            "Lower infrastructure overhead",
            "Cleaner, focused user experience",
          ].map((point, i) => (
            <div
              key={i}
              className="rounded-xl p-5 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10"
            >
              <p className="text-sm opacity-80">• {point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING PREVIEW ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Simple Pricing. Effective Pricing
        </h2>
        <p className="text-base opacity-70 mb-12">
          Start free. Upgrade only when you need more.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(services).map((plan, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl p-8
        bg-white/10 dark:bg-black/20
        backdrop-blur-xl
        border border-white/10
        shadow-lg
        transition-transform duration-300
        hover:-translate-y-1"
            >
              <span
                className="pointer-events-none absolute inset-0
          -translate-x-full
          bg-linear-to-r from-transparent via-white/30 to-transparent
          opacity-0
          transition-all duration-700
          group-hover:translate-x-full
          group-hover:opacity-100"
              />

              <h3 className="text-xl font-semibold mb-2 text-blue-800 relative z-10">
                {plan.name}
              </h3>

              <p className="text-3xl font-bold mb-4 relative z-10">
                ₹{plan.price}
                <span className="text-sm opacity-70"> /month</span>
              </p>

              <p className="text-sm opacity-70 relative z-10">
                {plan.videoLimit} video uploads <br />
                {plan.imageLimit} image transformations
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold">
          Start transforming today
        </h2>
        <p className="mt-4 text-sm sm:text-base opacity-70 max-w-xl mx-auto">
          Whether you’re preparing assets for social media, applications,
          or internal tools — EasyUploads stays fast, simple, and reliable.
        </p>

        <Link
          href="/sign-in"
          className="mt-10 btn btn-primary rounded-xl p-4"
        >
          Go to Dashboard
        </Link>
        <div>
          <h1 className="text-sm px-2 sm:text-base opacity-70 py-2 mt-12 border border-white/40 rounded-lg">
            <span className="text-red-500 font-semibold">NOTE: </span>
            This Platform is developed with limited features. More features can be introduced in future..<br></br>
            We will notify you in such case.
          </h1>
        </div>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
