"use client";

export default function EnvironmentSetupDocPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Environment Setup
        </h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Configure environment variables for Cloudinary, MongoDB, and Clerk
          before running the application.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Required Variables</h2>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
          {`# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# MongoDB
DATABASE_URL=mongodb+srv://...
`}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Database</h2>
        <p className="text-sm text-white/70">
          The app connects to MongoDB via Mongoose with a cached connection for
          hot reloads.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Health Check</h2>
        <p className="text-sm text-white/70">
          Verify connectivity at /api/health/db. On success you receive a 200
          response.
        </p>
      </section>
    </div>
  );
}
