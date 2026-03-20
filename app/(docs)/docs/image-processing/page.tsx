"use client";

export default function ImageProcessingPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Image Processing</h1>
        <p className="text-white/70 text-lg max-w-2xl">
          Transform images with precision using real-time filters, resizing tools, and optimized export formats.
          Designed for fast workflows and consistent, high-quality output.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tools Included</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">Effects & Filters</h3>
            <p className="text-sm text-white/70">
              Apply curated filters and visual effects with instant preview support.
              Access this feature at <span className="text-white/90">/add-effects</span>.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">Social Aspect Ratios</h3>
            <p className="text-sm text-white/70">
              Resize images for platform-specific formats such as Instagram, Twitter/X, and Facebook.
              Available at <span className="text-white/90">/social-share</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">How To Use In App</h2>
        <div className="space-y-3 text-white/70 text-sm">
          <p><span className="text-white/90 font-medium">Effects & Filters</span> (/add-effects)</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Upload an image from your device</li>
            <li>Select a filter or effect and preview changes in real time</li>
            <li>Download the processed image instantly</li>
          </ul>

          <p className="mt-4">
            <span className="text-white/90 font-medium">Social Aspect Ratios</span> (/social-share)
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Upload an image</li>
            <li>Select a predefined format (e.g., 1:1, 16:9)</li>
            <li>Download a platform-ready image with correct dimensions</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Quickstart</h2>
        <p className="text-white/70 text-sm">
          Upload an image and apply transformations programmatically using the API endpoint below.
        </p>
        <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-white/80">
          {`POST /api/image-upload
FormData: file: <binary image>`}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Tips & Limits</h2>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>• Maximum supported resolution: 25 Megapixels</li>
          <li>• Usage limits depend on your selected plan</li>
          <li>• Supported formats: JPEG, PNG, WebP</li>
        </ul>
      </section>
    </div>
  );
}