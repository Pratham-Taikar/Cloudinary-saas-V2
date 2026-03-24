"use client";

import React from "react";
import {
  CreditCard,
  RefreshCw,
  Zap,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export default function BillingUpgradesDocPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight text-white">
          Billing & Subscription
        </h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          Manage your processing power with our scalable subscription tiers.
          Powered by Razorpay, our billing system ensures secure transactions
          and automated credit management for uninterrupted workflows.
        </p>
      </section>

      {/* ================= SUBSCRIPTION LIFECYCLE ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-primary" /> The 30-Day Lifecycle
        </h2>
        <p className="text-white/60 leading-relaxed">
          Every subscription on EasyUploads operates on a strict 30-day billing
          cycle. Understanding this lifecycle is key to managing your processing
          quotas effectively.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-primary">
              <Zap className="w-4 h-4" /> Credit Resets
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Your image transformation and video compression counts are
              automatically reset to zero every 30 days from your{" "}
              <code className="text-xs bg-white/10 px-1 rounded">
                lastBillingDate
              </code>
              . Credits do not roll over to the next month.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-primary">
              <Calendar className="w-4 h-4" /> Plan Expiry
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Premium plans (Elite & Mega) have a fixed 30-day validity. If a
              renewal payment is not detected by the{" "}
              <code className="text-xs bg-white/10 px-1 rounded">
                planExpiry
              </code>{" "}
              date, your account will gracefully revert to the Free tier.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PAYMENT FLOW ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-400" /> Secure Payments
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70">
            We use Razorpay for all financial transactions. The upgrade process
            is synchronous and secure:
          </p>
          <ol className="text-white/60 text-sm space-y-4 list-decimal ml-6">
            <li>
              <strong>Order Creation</strong>: Our backend generates a unique
              Razorpay Order ID tied to your session and selected plan.
            </li>
            <li>
              <strong>Secure Handshake</strong>: The Razorpay Checkout modal
              handles sensitive card/UPI data directly on their secure servers.
            </li>
            <li>
              <strong>Verification</strong>: Upon payment, our server performs a
              HMAC SHA256 signature verification to ensure the transaction's
              integrity.
            </li>
            <li>
              <strong>Instant Provisioning</strong>: Once verified, your tier
              limits are updated in MongoDB, and a record is added to your{" "}
              <code className="text-xs bg-white/10 px-1 rounded">
                PaymentHistory
              </code>
              .
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
