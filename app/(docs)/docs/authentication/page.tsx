"use client";

import React from "react";
import { ShieldCheck, Lock, Users, Fingerprint } from "lucide-react";

export default function AuthenticationDocPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Authentication & Identity</h1>
        <p className="text-white/70 text-xl max-w-3xl leading-relaxed">
          EasyUploads utilizes Clerk for secure, industry-standard identity management. 
          Our authentication layer is designed to provide seamless access control 
          while maintaining high security standards for user data.
        </p>
      </section>

      {/* ================= KEY PILLARS ================= */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold">Secure Sessions</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            All client-server communication is protected by JWT-based session tokens. 
            Session validation occurs at the edge, ensuring sub-millisecond 
            authentication checks for every API request.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Fingerprint className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold">Multi-Factor Auth</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Support for TOTP, SMS, and Email-based 2FA is built-in. Users can 
            manage their security preferences directly through the Clerk account portal.
          </p>
        </div>
      </div>

      {/* ================= USER FLOWS ================= */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" /> Integrated Flows
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-white/90">Registration</h4>
            <p className="text-sm text-white/50 leading-relaxed">
              New users are provisioned with a default "Free" tier profile in MongoDB 
              immediately upon successful Clerk sign-up.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white/90">Profile Sync</h4>
            <p className="text-sm text-white/50 leading-relaxed">
              Metadata such as usernames and avatars are automatically synced 
              during the initial session handshake.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white/90">RBAC Enforcement</h4>
            <p className="text-sm text-white/50 leading-relaxed">
              User identity is used to resolve Role-Based Access Control (RBAC) 
              rules, determining processing limits and feature availability.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PROTECTED ENDPOINTS ================= */}
      <section className="p-8 rounded-3xl bg-black/40 border border-white/10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-red-400" /> API Security
        </h3>
        <p className="text-white/70 text-sm mb-6">
          All processing endpoints require a valid session. Unauthorized requests 
          (401) are automatically redirected to the sign-in flow.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
            <code className="text-xs text-primary">POST /api/image-upload</code>
            <span className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 font-bold uppercase tracking-wider">Protected</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
            <code className="text-xs text-primary">POST /api/video-upload</code>
            <span className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 font-bold uppercase tracking-wider">Protected</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
            <code className="text-xs text-primary">GET /api/user/payments</code>
            <span className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 font-bold uppercase tracking-wider">Protected</span>
          </div>
        </div>
      </section>
    </div>
  );
}
