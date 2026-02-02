"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import services from "@/lib/services";
import faqs from "@/lib/faqs";

function BillingPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { free, elite } = services;

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
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FREE */}
          <div className="rounded-2xl p-8 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-semibold">{free.name}</h2>
            <p className="text-sm opacity-70 mb-6">Get started for free</p>

            <p className="text-3xl font-bold mb-6">
              ₹{free.price}
              <span className="text-sm opacity-70"> /month</span>
            </p>

            <ul className="space-y-3 text-sm">
              <li>✔ {free.videoLimit} video uploads</li>
              <li>✔ {free.imageLimit} image transformations</li>
              <li>✔ Standard processing</li>
            </ul>

            <button
              disabled
              className="btn btn-outline w-full mt-8 cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* ELITE (Most Popular) */}
          <div className="relative rounded-2xl p-8 bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-primary/40 shadow-xl">
            <span className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-content text-xs font-semibold rounded-full">
              Most Popular
            </span>

            <h2 className="text-2xl font-semibold">{elite.name}</h2>
            <p className="text-sm opacity-70 mb-6">
              Best for creators & power users
            </p>

            <p className="text-3xl font-bold mb-6">
              ₹{elite.price}
              <span className="text-sm opacity-70"> /month</span>
            </p>

            <ul className="space-y-3 text-sm">
              <li>✔ {elite.videoLimit} video uploads</li>
              <li>✔ {elite.imageLimit} image transformations</li>
              <li>✔ High-quality optimization</li>
            </ul>

            <button
              className="btn btn-primary w-full mt-8 rounded-xl"
              onClick={() => router.push("/checkout?plan=elite")}
            >
              Upgrade to Elite
            </button>
          </div>
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
