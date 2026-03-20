"use client";

export default function ApiReferencePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">API Reference</h1>
        <p className="text-white/70 text-lg max-w-2xl">
          A complete reference for interacting with EasyUploads programmatically.
          These endpoints allow you to upload, process, and retrieve media using a secure,
          authenticated workflow powered by Clerk.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">POST /api/image-upload</h2>
        <p className="text-sm text-white/70">
          Upload an image and receive a <span className="text-white/90">publicId</span>
          for rendering and further transformations. This endpoint also updates your usage counters.
        </p>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs
         text-white/80 whitespace-pre-wrap wrap-break-word">
          {`Headers:
  Authorization: (handled automatically via Clerk session)

Body (multipart/form-data):
  file: <binary image>

Responses:
  201 { publicId: string, user: { ... } }
  401 Unauthorized — User is not authenticated
  403 Forbidden — Image usage limit reached
  400 Bad Request — File missing or invalid
  500 Internal Server Error — Upload failed`}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">POST /api/video-upload</h2>
        <p className="text-sm text-white/70">
          Upload a video file and automatically compress it into an optimized MP4 format.
          Compression settings are applied dynamically based on content and size.
        </p>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs
         text-white/80 whitespace-pre-wrap wrap-break-word">
          {`Headers:
  Authorization: (handled via Clerk session)

Body (multipart/form-data):
  file: <binary video>
  title: string
  description: string (optional)
  originalSize: number

Responses:
  201 { video: {...}, updatedUser: {...} }
  401 Unauthorized — User is not authenticated
  403 Forbidden — Video usage limit reached
  400 Bad Request — File missing or invalid
  500 Internal Server Error — Processing failed`}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">GET /api/videos</h2>
        <p className="text-sm text-white/70">
          Retrieve a list of all videos uploaded by the authenticated user,
          including metadata such as duration, title, and storage identifiers.
        </p>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs
         text-white/80 whitespace-pre-wrap wrap-break-word">
          {`Headers:
  Authorization: (required)

Responses:
  200 [ { _id, title, publicId, duration, ... }, ... ]
  401 Unauthorized — Authentication required
  500 Internal Server Error — Failed to fetch data`}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">GET /api/user</h2>
        <p className="text-sm text-white/70">
          Fetch or initialize the current user's profile, including subscription plan,
          usage limits, and processed media counts.
        </p>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs
         text-white/80 whitespace-pre-wrap wrap-break-word">
          {`Responses:
  200 { userId, plan, imageCount, videoCount, ... }
  401 Unauthorized — Authentication required
  500 Internal Server Error — Failed to fetch user`}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">GET /api/health/db</h2>
        <p className="text-sm text-white/70">
          Verify database connectivity and ensure the backend is operational.
          Useful for debugging and monitoring system health.
        </p>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs
        text-white/80 whitespace-pre-wrap wrap-break-word">
          {`Responses:
  200 { success: true }
  500 { success: false, message }`}
        </div>
      </section>
    </div>
  );
}