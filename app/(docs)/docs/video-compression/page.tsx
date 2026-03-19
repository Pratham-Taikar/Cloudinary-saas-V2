"use client";

export default function VideoCompressionPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Video Compression
        </h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Upload videos and get optimized MP4 output using server-side
          Cloudinary transformations.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How To Use In App</h2>
        <ul className="list-disc ml-6 space-y-2 text-white/70 text-sm">
          <li>Go to /video-upload</li>
          <li>Add title and description</li>
          <li>Upload a video (MP4, WebM, OGG)</li>
          <li>Wait for success confirmation</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Quickstart</h2>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-white/80">
          {`POST /api/video-upload

FormData:
  file: <binary video>
  title: "My Video"
  description: "Optional"
  originalSize: <bytes>`}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Notes & Limits</h2>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>• UI upload limit: 10 MB per file</li>
          <li>• Videos are saved with a unique public_id</li>
          <li>• Plan limits apply to total videos processed</li>
        </ul>
      </section>
    </div>
  );
}
