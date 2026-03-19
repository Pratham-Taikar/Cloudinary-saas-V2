 "use client";
 
 export default function ApiReferencePage() {
   return (
     <div className="space-y-12">
       <div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">API Reference</h1>
         <p className="text-white/70 text-lg max-w-2xl">
           Core endpoints for media uploads and retrieval. Authentication via Clerk is required for protected routes.
         </p>
       </div>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">POST /api/image-upload</h2>
         <p className="text-sm text-white/70">Upload an image and receive a public_id for client-side rendering.</p>
         <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
{`Headers:
  Authorization: (handled by Clerk session)
Body (multipart/form-data):
  file: <binary image>

Responses:
  201 { publicId: string, user: { ... } }
  401 Unauthorized
  403 Image limit reached
  400 File not found
  500 Upload failed`}
         </div>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">POST /api/video-upload</h2>
         <p className="text-sm text-white/70">Upload a video; server compresses to MP4 with quality auto.</p>
         <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
{`Headers:
  Authorization: (Clerk)
Body (multipart/form-data):
  file: <binary video>
  title: string
  description: string (optional)
  originalSize: number

Responses:
  201 { video: {...}, updatedUser: {...} }
  401 Unauthorized
  403 Video limit reached
  400 File not found
  500 Error`}
         </div>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">GET /api/videos</h2>
         <p className="text-sm text-white/70">List your uploaded videos.</p>
         <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
{`Headers:
  Authorization: (Clerk)

Responses:
  200 [ { _id, title, publicId, duration, ... }, ... ]
  401 Unauthorized
  500 Failed to fetch`}
         </div>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">GET /api/user</h2>
         <p className="text-sm text-white/70">Fetches or creates your user profile with plan and counters.</p>
         <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
{`Responses:
  200 { userId, plan, imageCount, videoCount, ... }
  401 Unauthorized
  500 Failed`}
         </div>
       </section>
 
       <section className="space-y-4">
         <h2 className="text-2xl font-semibold">GET /api/health/db</h2>
         <p className="text-sm text-white/70">Database connection healthcheck.</p>
         <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80">
{`Responses:
  200 { success: true }
  500 { success: false, message }`}
         </div>
       </section>
     </div>
   );
 }
