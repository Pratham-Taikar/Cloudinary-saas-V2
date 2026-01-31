"use client";

import Link from "next/link";
import services from "@/lib/services";

interface LimitReachedProps {
  type: "image" | "video";
  used: number;
  limit: number;
  plan: keyof typeof services;
}

function LimitReached({
  type,
  used,
  limit,
  plan,
}: LimitReachedProps) {
  const currentPlan = services[plan];
  const nextPlan =
    plan === "free" ? services.elite : services.Mega;

  const label =
    type === "image" ? "Image uploads" : "Video uploads";

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="max-w-lg w-full rounded-2xl p-8
        bg-white/10 dark:bg-black/20
        backdrop-blur-xl
        border border-white/10
        shadow-2xl text-center space-y-6"
      > 
        <h1 className="text-2xl mt-4 font-bold tracking-tight">
          Upload limit reached
        </h1>

        <p className="text-sm opacity-80">
          You’ve reached the maximum number of{" "}
          <span className="font-semibold">{label}</span> allowed
          on the <span className="font-semibold">{currentPlan.name}</span>{" "}
          plan.
        </p>

        <div className="rounded-xl p-4 bg-white/10 border border-white/10">
          <p className="text-sm">
            Used: <span className="font-semibold">{used}</span> /{" "}
            <span className="font-semibold">{limit}</span>
          </p>

          <div className="w-full h-2 mt-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-2 bg-red-500"
              style={{
                width: `${Math.min((used / limit) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Link href={`/billing?plan=${nextPlan.name.toLowerCase()}`}>
            <button className="btn btn-primary w-full rounded-xl">
              Upgrade to {nextPlan.name}
            </button>
          </Link>

          <Link href="/user-dashboard">
            <button className="btn btn-outline mt-4 w-full rounded-xl">
              Go back to dashboard
            </button>
          </Link>
        </div>

        <p className="text-xs mb-4 opacity-60">
          Upgrade to continue uploading without interruption.
        </p>
      </div>
    </div>
  );
}

export default LimitReached;
