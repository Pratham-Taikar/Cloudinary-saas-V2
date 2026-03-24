"use client";

import React from "react";
import Link from "next/link";
import { 
  UserPlus, 
  Key, 
  Cloud, 
  CreditCard, 
  Rocket,
  ArrowRight
} from "lucide-react";

function GettingStarted() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Getting Started</h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          Follow this comprehensive guide to integrate EasyUploads into your
          application architecture. We've streamlined the onboarding process to 
          get you from zero to production in minutes.
        </p>
      </section>

      {/* ================= PREREQUISITES ================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2">Prerequisites</h2>
        <p className="text-white/60">Before you begin, ensure you have the following credentials ready:</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-medium">Clerk Auth Account</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-sm font-medium">Cloudinary Cloud Name</span>
          </div>
        </div>
      </section>

      {/* ================= IMPLEMENTATION STEPS ================= */}
      <section className="space-y-10">
        <h2 className="text-2xl font-bold">Implementation Steps</h2>

        <div className="space-y-12">
          {/* STEP 1 */}
          <div className="relative pl-10 border-l-2 border-primary/30">
            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-black" />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" /> 1. Environment Configuration
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Configure your system environment variables. These keys are essential for 
              establishing secure handshakes with our underlying service providers.
            </p>
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80 space-y-2 overflow-x-auto">
              <div>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...</div>
              <div>CLERK_SECRET_KEY=sk_test_...</div>
              <div>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...</div>
              <div>RAZORPAY_KEY_SECRET=...</div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative pl-10 border-l-2 border-primary/30">
            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-black" />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" /> 2. Initialize Authentication
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Our platform uses Clerk for identity management. Once a user signs up, 
              their profile is automatically synchronized with our MongoDB cluster via 
              the <code className="text-primary bg-primary/10 px-1 rounded">/api/user</code> heartbeat endpoint.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="relative pl-10 border-l-2 border-primary/30">
            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-black" />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" /> 3. Select a Processing Tier
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Navigate to the <Link href="/billings" className="text-primary hover:underline">Billing Portal</Link> to select your quota. 
              The <strong>Free Tier</strong> allows for 10 image transforms and 3 video compressions 
              to get you started with development.
            </p>
          </div>
        </div>
      </section>

      {/* ================= NEXT STEPS ================= */}
      <section className="pt-10 border-t border-white/10">
        <h2 className="text-2xl font-bold mb-6">Deep Dive</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/docs/image-processing"
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <h4 className="font-bold mb-2 flex items-center justify-between">
              Image Processing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-sm text-white/50">Master AI background removal and generative fill.</p>
          </Link>
          <Link
            href="/docs/api-reference"
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <h4 className="font-bold mb-2 flex items-center justify-between">
              API Reference <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-sm text-white/50">Explore full endpoint documentation and RBAC logic.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default GettingStarted;
