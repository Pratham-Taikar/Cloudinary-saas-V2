"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import services from "@/lib/services";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const text = "EASYUPLOADS";
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const letterTimer = setInterval(() => {
      setVisibleLetters((prev) => (prev < text.length ? prev + 1 : prev));
    }, 140);

    const exitTimer = setTimeout(() => {
      onFinish();
    }, 2600);

    return () => {
      clearInterval(letterTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinish, text.length]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#040611] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.25),transparent_25%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_22%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.14),transparent_28%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="relative flex items-center gap-1 sm:gap-2">
          <div className="absolute -inset-10 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute -inset-24 rounded-full bg-blue-500/10 blur-[120px]" />
          {text.split("").map((char, index) => {
            const isVisible = index < visibleLetters;
            const isActive = index === visibleLetters - 1;

            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 10,
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.25 }}
                className={`relative text-3xl font-black tracking-[0.45em] sm:text-7xl ${isActive
                    ? "text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.85)]"
                    : "text-white"
                  }`}
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200 backdrop-blur-xl">
      {children}
    </div>
  );
}

function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GlowCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl hover:border-cyan-400/30 hover:bg-white/8 hover:shadow-[0_24px_90px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-blue-600/15 text-lg">
          {icon || "✦"}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-7 text-white/70">{desc}</p>
      </div>
    </motion.div>
  );
}

function Showcase({
  title,
  desc,
  reverse = false,
  pill,
  children,
}: {
  title: string;
  desc: string;
  reverse?: boolean;
  pill: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <div
        className={`grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-7 backdrop-blur-2xl lg:grid-cols-2 lg:gap-12 ${reverse ? "lg:[direction:rtl]" : ""
          }`}
      >
        <div className={`${reverse ? "lg:[direction:ltr]" : ""} flex flex-col justify-center`}>
          <Badge>{pill}</Badge>
          <h2 className="mt-5 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
            {desc}
          </p>
        </div>

        <div className={`${reverse ? "lg:[direction:ltr]" : ""}`}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/25 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

const featureList = [
  { title: "Background Removal", desc: "AI-powered subject separation with pixel-level accuracy.", icon: "◌" },
  { title: "Image Filters", desc: "Professional filters, contrast, sharpen, and more.", icon: "◈" },
  { title: "Resize & Optimize", desc: "Smart resizing with WebP & AVIF optimization.", icon: "↗" },
  { title: "Video Compression", desc: "Reduce size up to 80% without quality loss.", icon: "▣" },
  { title: "On-Demand Processing", desc: "No storage — process only when needed.", icon: "◍" },
  { title: "Creative Backgrounds", desc: "Prompt based generative AI background creation.", icon: "✦" },
];

function HeroFloatingMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto mt-14 max-w-5xl"
    >
      <div className="absolute -left-6 top-10 h-40 w-40 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div className="h-full rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(34,211,238,0.25),rgba(59,130,246,0.05))]" />
      </div>

      <div className="absolute -right-8 top-20 h-36 w-36 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div className="h-full rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(99,102,241,0.28),rgba(34,211,238,0.08))]" />
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_40%)]" />
        <div className="relative rounded-[2rem] border border-white/10 bg-[#060b19]/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/60">
              Live processing
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Upload</p>
              <div className="mt-3 h-28 rounded-2xl bg-[#111827]/80 border border-white/5 p-3 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    📁
                  </div>

                  <div>
                    <p className="text-sm text-white font-medium">photo.png</p>
                    <p className="text-[11px] text-white/40">4.2 MB</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[82%] rounded-full bg-cyan-400 animate-pulse"></div>
                  </div>

                  <p className="text-[10px] text-cyan-300">
                    Uploading..
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Process</p>
              <div className="mt-3 h-28 rounded-2xl flex flex-col justify-center items-center border border-cyan-400/10 bg-[#06131f]">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-cyan-500/20"></div>

                  <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-cyan-400"></div>

                </div>

                <p className="mt-4 text-xs text-cyan-300 tracking-widest">
                  AI PROCESSING...
                </p>

                <p className="text-[11px] text-white/40">
                  Compress • Resize • Remove BG
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Download</p>
              <div className="mt-3 h-28 rounded-2xl bg-[#111827]/80 border border-white/5 p-3 flex flex-col justify-between">
                <div className="flex justify-between">

                  <div>
                    <p className="text-sm font-medium text-white">
                      optimized.webp
                    </p>

                    <p className="text-[11px] text-green-400">
                      ↓ 78% Smaller
                    </p>

                  </div>

                  <div className="h-9 w-9 rounded-xl bg-green-500/20 flex items-center justify-center">
                    ✓
                  </div>

                </div>
                <button className="rounded-xl bg-cyan-500/20 border border-cyan-400/20 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/30">
                  Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TrustMarquee() {
  const items = ["Fast", "Reliable", "Scalable", "Secure", "Clean UI", "No Storage"];
  return (
    <div className="relative mt-10 overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
      <motion.div
        animate={{ x: ["10%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] items-center"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="mx-6 whitespace-nowrap text-sm font-medium tracking-[0.3em] text-white/50 uppercase">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const glowX = useTransform(springX, (v) => `${v}px`);
  const glowY = useTransform(springY, (v) => `${v}px`);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#040611] text-white"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(34,211,238,0.16), transparent 22%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(99,102,241,0.16),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.09),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,6,17,0)_0%,rgba(4,6,17,0.35)_70%,rgba(4,6,17,1)_100%)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#040611]/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <motion.img
            src="/saaslogo.png"
            alt="weblogo"
            className="w-36 sm:w-48"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/billings" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
              Pricing
            </Link>
            <Link href="/info" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
              Capabilities
            </Link>
          </motion.div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-18 sm:pb-24 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-8 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl"
          >
            <span className="block">Transform Images & Videos</span>
            <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Instantly. At Scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
          >
            A modern SaaS platform to transform images and videos instantly. No clutter. No storage overhead. Just fast, reliable processing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link href="/sign-in" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(34,211,238,0.25)] transition hover:scale-[1.02]">
              Start for Free
            </Link>
            <Link href="/billings" className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/10">
              View Pricing
            </Link>
            <Link href="/docs/overview" className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/10">
              Docs
            </Link>
          </motion.div>
        </div>

        <HeroFloatingMockup />
      </section>

      <TrustMarquee />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <ScrollReveal>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl sm:p-10">
            <div className="text-center">
              <Badge>What it does</Badge>
              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                Built for clean, fast, on-demand media workflows
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                The platform focuses on real-time media transformations — helping you prepare images and videos exactly how you need them, without storing unnecessary assets.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureList.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <GlowCard title={f.title} desc={f.desc} icon={f.icon} />
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-18 lg:px-8">
        <Showcase
          pill="Effects"
          title="Effects over Images"
          desc="Add effects to images, get them modified with multiple effects and filters provided. Just upload and get results."
        >
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} src="/effect_original.png" alt="Original" className="h-full w-full rounded-2xl object-cover" />
            <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} src="/effect_transformed.png" alt="Transformed" className="h-full w-full rounded-2xl object-cover" />
          </div>
        </Showcase>

        <Showcase
          reverse
          pill="Removal"
          title="Background Removal"
          desc="Generate clean, and clear background removed images. Perfect for product photos, profile images, and marketing assets."
        >
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} src="/background_original.png" alt="Original" className="h-full w-full rounded-2xl object-cover" />
            <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} src="/background_removed.png" alt="Background Removed" className="h-full w-full rounded-2xl object-cover" />
          </div>
        </Showcase>

        <Showcase
          pill="Generative"
          title="Generative Background"
          desc="Use your creativity to generate background with prompting. Different prompts, different results."
        >
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} src="/ai_original.png" alt="Original" className="h-full w-full rounded-2xl object-cover" />
            <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} src="/ai_tranformedpng.png" alt="Transformed" className="h-full w-full rounded-2xl object-cover" />
          </div>
          <div className="px-4 pb-4">
            <p className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-300">
              Prompt: Teddy bears arranged on shelf.
            </p>
          </div>
        </Showcase>

        <Showcase
          reverse
          pill="Video"
          title="Video Compression"
          desc="Helps in decreasing video size just by uploading. Get on-the-go video compression. Video compressing smartly based on the content and quality."
        >
          <div className="p-4">
            <motion.img whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} src="./video.png" alt="Video compression" className="w-full rounded-2xl object-cover" />
          </div>
        </Showcase>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <ScrollReveal>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:p-10">
            <div className="text-center">
              <Badge>Workflow</Badge>
              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">How it works</h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-4">
              {[
                { title: "Media", desc: "Upload videos or images securely with support for high-resolution files." },
                { title: "Processing", desc: "Video compression or image transformations like resize, crop, and format change." },
                { title: "Preview", desc: "Preview results in real time before exporting — no waiting, no guesswork." },
                { title: "Download", desc: "Download optimized media ready for web, apps, or social platforms." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 font-bold text-black shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                    {i + 1}
                  </div>
                  <p className="mt-5 text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-white/70">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_36%),rgba(255,255,255,0.05)] px-6 py-16 backdrop-blur-2xl sm:px-10">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_40%)]"
            />
            <h2 className="relative text-4xl font-black tracking-tight sm:text-6xl">
              Start <span className="text-cyan-300">Transforming</span> Today
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Build faster workflows, reduce file bloat, and deliver polished media experiences from one powerful platform.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="relative mt-10 inline-flex"
            >
              <Link href="/sign-in" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(34,211,238,0.25)] transition">
                Go to Dashboard
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="mt-10 border-t border-white/10 bg-white/5 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/70 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Pratham. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/contact" className="transition hover:text-white">Contact</a>
            <a href="/docs/overview" className="transition hover:text-white">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}