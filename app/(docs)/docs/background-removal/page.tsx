"use client";

export default function BackgroundRemovalPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Background Removal
        </h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Remove backgrounds with high precision and export transparent PNGs
          ready for e‑commerce or profiles.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How To Use In App</h2>
        <ul className="list-disc ml-6 space-y-2 text-white/70 text-sm">
          <li>Go to /remove-background</li>
          <li>Upload an image and preview the result</li>
          <li>Download a transparent PNG</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Quickstart</h2>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-white/80">
          {`POST /api/image-upload

FormData:
  file: <binary image>`}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Notes & Limits</h2>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>• Output with transparency uses PNG</li>
          <li>• Max image resolution: 25 Megapixels</li>
          <li>• Plan limits apply to total images processed</li>
        </ul>
      </section>
    </div>
  );
}
