"use client";

export default function InfoPage() {
  return (
    <div className="relative min-h-screen px-4 py-16">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />

      <div className="max-w-6xl mx-auto space-y-20">
        {/* HEADER */}
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Platform Capabilities
          </h1>
          <p className="mt-4 text-base opacity-70 max-w-3xl mx-auto">
            This platform provides fast, on-demand image transformations and
            video compression tools designed for creators, developers, and
            teams who value performance and simplicity.
          </p>
        </section>

        {/* IMAGE TRANSFORMATIONS */}
        <section className="space-y-10">
          <h2 className="text-2xl text-center font-semibold">
            Image Transformations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Resize & Aspect Ratio Conversion"
              description="Convert images to predefined social media formats or custom dimensions while preserving visual quality."
              items={[
                "Instagram (1:1, 4:5)",
                "Twitter/X posts and headers",
                "Facebook covers",
                "Custom width and height resizing",
              ]}
            />

            <InfoCard
              title="Smart Cropping"
              description="Automatically crops images using intelligent gravity detection to keep the most important subject in frame."
              items={[
                "Auto subject detection",
                "Face-aware cropping",
                "Center and custom gravity options",
              ]}
            />

            <InfoCard
              title="Quality Optimization"
              description="Images are optimized automatically to reduce file size without visible quality loss."
              items={[
                "Auto quality adjustment",
                "Bandwidth-friendly outputs",
                "Fast loading across devices",
              ]}
            />

            <InfoCard
              title="Format Conversion"
              description="Convert images into modern formats that support better compression and transparency."
              items={[
                "PNG (transparent backgrounds)",
                "Web-friendly optimized formats",
                "Automatic format selection when supported",
              ]}
            />
          </div>
        </section>

        {/* AI IMAGE FEATURES */}
        <section className="space-y-10">
          <h2 className="text-2xl font-semibold">
            AI-Powered Image Enhancements
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Background Removal"
              description="Automatically removes image backgrounds using AI segmentation, producing clean transparent outputs."
              items={[
                "Transparent PNG output",
                "Subject-aware edge detection",
                "Ideal for product images & profiles",
              ]}
            />

            <InfoCard
              title="Image Effects & Enhancements"
              description="Apply visual enhancements and effects to improve clarity and appearance."
              items={[
                "Auto enhancement",
                "Color and contrast optimization",
                "Visual clarity improvements",
              ]}
            />
          </div>
        </section>

        {/* VIDEO */}
        <section className="space-y-10">
          <h2 className="text-2xl font-semibold">
            Video Compression & Optimization
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Video Upload & Processing"
              description="Upload videos and process them using efficient compression pipelines."
              items={[
                "MP4 optimized output",
                "Fast server-side processing",
                "Compatible across platforms",
              ]}
            />

            <InfoCard
              title="Smart Compression"
              description="Videos are compressed to reduce file size while maintaining acceptable visual quality."
              items={[
                "Automatic bitrate adjustment",
                "Resolution-aware compression",
                "Optimized for streaming & sharing",
              ]}
            />
          </div>
        </section>

        {/* OUTPUT BEHAVIOR */}
        <section className="space-y-10">
          <h2 className="text-2xl font-semibold">
            Output & Download Behavior
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              title="Instant Preview"
              description="All transformations are previewed in real time before download."
              items={[
                "No waiting queues",
                "Immediate feedback",
                "Accurate final preview",
              ]}
            />

            <InfoCard
              title="On-Demand Downloads"
              description="Transformed media can be downloaded instantly without persistent storage."
              items={[
                "No stored assets",
                "No long-term data retention",
                "Privacy-friendly processing",
              ]}
            />
          </div>
        </section>

        {/* FOOTNOTE */}
        <section className="text-center">
          <p className="text-sm opacity-60 max-w-3xl mx-auto">
            The platform is intentionally designed for stateless processing.
            Media is transformed on demand and delivered instantly, ensuring
            scalability, performance, and reduced infrastructure overhead.
          </p>
        </section>

        <footer className="text-center text-xs opacity-60">
          © {new Date().getFullYear()} Pratham Taikar. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div
      className="rounded-2xl p-6
      bg-white/10 dark:bg-black/20
      backdrop-blur-xl
      border border-white/10
      shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>
      <p className="text-sm opacity-75 mb-4">
        {description}
      </p>
      <ul className="space-y-2 text-sm opacity-80">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
