"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import services, { planOrder, type PlanKey } from "@/lib/services";
import faqs from "@/lib/faqs";

const planMeta: Record<PlanKey, { tagline: string; features: string[]; badge?: string }> = {
  free: {
    tagline: "Get started for free",
    features: ["Standard processing"],
  },
  elite: {
    tagline: "Best for creators & power users",
    badge: "Most Popular",
    features: ["High-quality optimization", "Priority processing"],
  },
  mega: {
    tagline: "For teams & heavy workloads",
    badge: "Best Value",
    features: ["Ultra-high-quality optimization", "Priority processing", "Premium support"],
  },
};

function BillingPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-4 py-16 relative">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-start">
          <Link
            href="/home"
            className="btn btn-ghost rounded-xl"
          >
            ← Back to Home
          </Link>
        </div>
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Choose Your Plan
          </h1>
          <p className="mt-2 text-base opacity-70">
            Simple pricing. Upgrade anytime.
          </p>
        </div>

        {/* PRICING */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {planOrder.map((key) => {
            const plan = services[key];
            const meta = planMeta[key];
            const isFree = key === "free";
            const hasBadge = !!meta.badge;

            return (
              <div
                key={key}
                className={`relative rounded-2xl p-8 backdrop-blur-xl shadow-lg ${
                  hasBadge
                    ? "bg-white/20 dark:bg-black/30 border border-primary/40 shadow-xl"
                    : "bg-white/10 dark:bg-black/20 border border-white/10"
                }`}
              >
                {hasBadge && (
                  <span className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full">
                    {meta.badge}
                  </span>
                )}

                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                <p className="text-sm opacity-70 mb-6">{meta.tagline}</p>

                <p className="text-3xl font-bold mb-6">
                  ₹{plan.price}
                  <span className="text-sm opacity-70"> /month</span>
                </p>

                <ul className="space-y-3 text-sm">
                  <li>✔ {plan.videoLimit} video uploads</li>
                  <li>✔ {plan.imageLimit} image transformations</li>
                  {meta.features.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                  ))}
                </ul>

                {isFree ? (
                  <button
                    disabled
                    className="btn btn-outline w-full mt-8 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-full mt-8 rounded-xl"
                    onClick={() => router.push(`/checkout?plan=${key}`)}
                  >
                    Upgrade to {plan.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  className="rounded-xl p-5 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 shadow-md cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm">
                      {faq.question}
                    </h3>
                    <span className="text-xl opacity-70">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-sm opacity-80">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs opacity-60">
          Secure payments • Cancel anytime
        </p>
      </div>
    </div>
  );
}

export default BillingPage;
