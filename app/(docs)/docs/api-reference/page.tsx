"use client";

import React from "react";
import { Globe, Code2, Lock, Database, CreditCard } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
          API Reference
        </h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          The EasyUploads REST API provides a programatic interface for media
          transformation and user management. All requests are authenticated via
          Clerk and scoped to the active user session.
        </p>
      </section>

      {/* ================= BASE CONFIG ================= */}
      <section className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Globe className="w-5 h-5" />
          <h3 className="font-bold">Base URL</h3>
        </div>
        <code className="block p-3 rounded-lg bg-black/40 text-sm text-white/80 border border-white/5">
          website_url/api
        </code>
        <div className="flex items-center gap-3 text-primary pt-4">
          <Lock className="w-5 h-5" />
          <h3 className="font-bold">Authentication</h3>
        </div>
        <p className="text-sm text-white/50">
          Bearers tokens are managed automatically by the{" "}
          <code className="bg-white/10 px-1 rounded text-xs">
            ClerkProvider
          </code>
          . For server-to-server requests, ensure the{" "}
          <code className="bg-white/10 px-1 rounded text-xs">__session</code>{" "}
          cookie is present.
        </p>
      </section>

      {/* ================= ENDPOINTS ================= */}
      <div className="space-y-12">
        {/* USER ENDPOINT */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <Database className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">User & Identity</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase">
                GET
              </span>
              <code className="text-lg font-bold text-white/90">/api/user</code>
            </div>
            <p className="text-sm text-white/60">
              Retrieves the user profile, including active plan and usage
              metrics. This endpoint also triggers the{" "}
              <strong>Subscription Credit Reset</strong> logic.
            </p>
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
              {`Response (200 OK):
{
  "userId": "user_2...",
  "plan": "elite",
  "imageCount": 12,
  "videoCount": 2,
  "lastBillingDate": "2024-03-24T..."
}`}
            </div>
          </div>
        </section>

        {/* MEDIA ENDPOINTS */}
        <section className="space-y-10">
          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <Code2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Media Processing</h2>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
                POST
              </span>
              <code className="text-lg font-bold text-white/90">
                /api/image-upload
              </code>
            </div>
            <p className="text-sm text-white/60">
              Uploads media through the browser, then persists the returned
              Cloudinary metadata and increments usage after the server-side
              save succeeds.
            </p>
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
              {`Body (Multipart):
  file: Binary Data (Required)

Response (201 Created):
{
  "publicId": "v123456/user_abc/...",
  "url": "https://res.cloudinary.com/..."
}`}
            </div>
          </div>

          {/* VIDEO UPLOAD */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
                POST
              </span>
              <code className="text-lg font-bold text-white/90">
                /api/video-upload
              </code>
            </div>
            <p className="text-sm text-white/60">
              Generates a signed Cloudinary upload request, sends the file
              directly from the browser, and persists the returned metadata in
              the <code className="bg-white/10 px-1 rounded text-xs">Video</code>{" "}
              collection.
            </p>
          </div>
        </section>

        {/* PAYMENT ENDPOINTS */}
        <section className="space-y-10">
          <div className="flex items-center gap-3 border-b border-white/10 pb-2">
            <CreditCard className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Billing & Payments</h2>
          </div>

          {/* RAZORPAY ORDER */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
                POST
              </span>
              <code className="text-lg font-bold text-white/90">
                /api/razorpay/order
              </code>
            </div>
            <p className="text-sm text-white/60">
              Initiates a transaction by creating a Razorpay order record.
            </p>
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
              {`Body (JSON):
{
  "planKey": "elite"
}

Response (200 OK):
{
  "id": "order_O123...",
  "amount": 14900,
  "currency": "INR"
}`}
            </div>
          </div>

          {/* RAZORPAY VERIFY */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
                POST
              </span>
              <code className="text-lg font-bold text-white/90">
                /api/razorpay/verify
              </code>
            </div>
            <p className="text-sm text-white/60">
              Validates the HMAC SHA256 signature from Razorpay and upgrades the
              user tier.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
