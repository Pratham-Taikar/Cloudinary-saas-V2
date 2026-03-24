"use client";

import { useState } from "react";

export default function EnvironmentSetupDocPage() {
  const [showPreview, setShowPreview] = useState(false);

  const sampleEnv = `# ================= CLERK =================
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/home

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx

# ================= DATABASE =================
DATABASE_URL=mongodb_connection_string

# ================= CLOUDINARY =================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ================= RAZORPAY =================
NEXT_PUBLIC_RAZORPAY_KEY_ID=xxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxx
`;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Environment Setup
        </h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Configure environment variables for authentication, database, and
          media processing before running the application. These variables are
          required for the platform to function correctly.
        </p>
      </div>

      {/* ================= REQUIRED VARIABLES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Required Variables</h2>

        <p className="text-sm text-white/70">
          Instead of exposing real credentials, use the preview below to
          understand how your <span className="text-white/90">.env</span> file
          should be structured.
        </p>

        <button
          onClick={() => setShowPreview(true)}
          className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-sm"
        >
          Preview .env File
        </button>
      </section>

      {/* ================= DATABASE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Database</h2>
        <p className="text-sm text-white/70">
          The application connects to MongoDB using a persistent connection
          strategy. A cached connection is used during development to prevent
          unnecessary reconnections during hot reloads.
        </p>
      </section>

      {/* ================= HEALTH CHECK ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Health Check</h2>
        <p className="text-sm text-white/70">
          You can verify database connectivity using the endpoint
          <span className="text-white/90"> /api/health/db</span>. A successful
          connection returns a <span className="text-white/90">200 OK</span>{" "}
          response.
        </p>
      </section>

      {/* ================= FULLSCREEN PREVIEW ================= */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col">
          {/* TOP BAR */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold">.env Preview</h2>

            <button
              onClick={() => setShowPreview(false)}
              className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              Close
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-auto p-6">
            <pre className="bg-black/60 border border-white/10 rounded-xl p-6 text-sm text-white/80 font-mono whitespace-pre-wrap wrap-break-word">
              {sampleEnv}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
