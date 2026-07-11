"use client";

import React from "react";
import { Check, ShieldAlert, BarChart3, Clock } from "lucide-react";

export default function PlansLimitsPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
          Plans & Service Limits
        </h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          EasyUploads enforces Role-Based Access Control (RBAC) through tiered
          processing quotas. Understand your limits to ensure consistent
          application performance.
        </p>
      </section>

      {/* ================= COMPARISON TABLE ================= */}
      <section className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-150">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 font-bold text-white/90">Feature</th>
              <th className="py-4 font-bold text-white/90">Free</th>
              <th className="py-4 font-bold text-primary">Elite</th>
              <th className="py-4 font-bold text-green-400">Mega</th>
            </tr>
          </thead>
          <tbody className="text-sm text-white/60">
            <tr className="border-b border-white/5">
              <td className="py-4">Monthly Price</td>
              <td className="py-4">₹0</td>
              <td className="py-4">₹149</td>
              <td className="py-4">₹399</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 font-medium text-white/80">
                Image Transformations
              </td>
              <td className="py-4">10</td>
              <td className="py-4">75</td>
              <td className="py-4">250</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 font-medium text-white/80">
                Video Compressions
              </td>
              <td className="py-4">3</td>
              <td className="py-4">20</td>
              <td className="py-4">50</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4">AI Background Removal</td>
              <td className="py-4 text-green-400">
                <Check className="w-4 h-4" />
              </td>
              <td className="py-4 text-green-400">
                <Check className="w-4 h-4" />
              </td>
              <td className="py-4 text-green-400">
                <Check className="w-4 h-4" />
              </td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4">Generative AI Tools</td>
              <td className="py-4 text-white/20">Limited</td>
              <td className="py-4 text-green-400">
                <Check className="w-4 h-4" />
              </td>
              <td className="py-4 text-green-400">
                <Check className="w-4 h-4" />
              </td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4">Support Response</td>
              <td className="py-4">Standard</td>
              <td className="py-4 text-white/80 font-medium">Priority</td>
              <td className="py-4 text-white/80 font-medium">Priority</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ================= ENFORCEMENT LOGIC ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-400" /> Quota Enforcement
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Real-time Tracking
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Every successful call to{" "}
              <code className="text-xs bg-white/10 px-1 rounded">
                /api/image-upload
              </code>{" "}
              or
              <code className="text-xs bg-white/10 px-1 rounded">
                /api/video-upload
              </code>{" "}
              increments your usage counters in MongoDB. Failed processing tasks
              do not count towards your quota.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Quota Resets
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Limits are hard-capped. Once a limit is reached, APIs will return
              a
              <span className="text-red-400 font-mono mx-1">403 Forbidden</span>{" "}
              response. Counters reset automatically every 30 days based on your
              subscription start date.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MONITORING ================= */}
      <section className="p-8 rounded-3xl bg-black/40 border border-white/10">
        <h3 className="text-xl font-bold mb-4">Usage Monitoring</h3>
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          You can monitor your current consumption in real-time through the
          <strong> User Dashboard</strong>. We provide visual indicators showing
          exactly how many credits you have remaining for the current cycle.
        </p>
        <a
          href="/user-dashboard"
          className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
        >
          View my Dashboard →
        </a>
      </section>
    </div>
  );
}
