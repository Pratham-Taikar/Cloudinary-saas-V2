"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import services, { getNextPlan, type PlanKey } from "@/lib/services";

interface User {
  userId: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  imageCount: number;
  videoCount: number;
  plan: PlanKey;
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500">{error}</div>;

  if (!user)
    return <div className="text-center">User not found</div>;

  const plan = services[user.plan] || services.free;
  const nextPlanKey = getNextPlan(user.plan);
  const nextPlan = nextPlanKey ? services[nextPlanKey] : null;

  const remainingVideos = Math.max(
    plan.videoLimit - user.videoCount,
    0
  );

  const remainingImages = Math.max(
    plan.imageLimit - user.imageCount,
    0
  );

  const imagelimitReached = remainingImages === 0;
  const videoLimitReached = remainingVideos === 0;

  return (
    <div className="relative min-h-screen px-4 sm:px-6">
      <div className="max-w-6xl mx-auto py-8 space-y-10">

        {(imagelimitReached && videoLimitReached) && (
          <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-center text-red-400 font-medium">
            Your plan has reached maximum uploads. Please upgrade to increase upload limits.
          </div>
        )}

        {/* ================= USER CARD ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl p-6
          bg-white/10 dark:bg-black/20
          backdrop-blur-xl
          border border-white/10
          shadow-lg">

          {user.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-2 ring-white/20"
            />
          )}

          <div className="text-center sm:text-left">
            <p className="text-lg sm:text-xl font-semibold">
              {user.username || "User"}
            </p>
            <p className="text-sm opacity-70 break-all">
              {user.email}
            </p>
            <p className="mt-2 text-sm">
              Plan:{" "}
              <span className="font-semibold">
                {plan.name}
              </span>
            </p>
          </div>
        </div>

        {/* ================= STATS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Usage Summary */}
          <div className={`rounded-2xl p-6
            bg-white/10 dark:bg-black/20
            backdrop-blur-xl
            border
            shadow-lg
            ${imagelimitReached && videoLimitReached ? "border-red-500/60" : "border-white/10"}`}
          >
            <h2 className="text-lg font-semibold mb-4">
              Usage Summary
            </h2>

            {/* Video usage */}
            <p className="text-sm mb-1">
              Videos used: {user.videoCount} / {plan.videoLimit}
            </p>
            <div className="w-full bg-white/10 h-2 rounded mb-4 overflow-hidden">
              <div
                className={`h-2 transition-all duration-300
                  ${videoLimitReached ? "bg-red-500" : "bg-primary"}`}
                style={{
                  width: `${Math.min(
                    (user.videoCount / plan.videoLimit) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

            {/* Image usage */}
            <p className="text-sm mb-1">
              Images used: {user.imageCount} / {plan.imageLimit}
            </p>
            <div className="w-full bg-white/10 h-2 rounded overflow-hidden">
              <div
                className={`h-2 transition-all duration-300
                  ${imagelimitReached ? "bg-red-500" : "bg-secondary"}`}
                style={{
                  width: `${Math.min(
                    (user.imageCount / plan.imageLimit) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <Link href="/docs/overview" className="btn btn-sm btn-outline px-4 sm:px-8 mt-4">
              Read Documentation
            </Link>
          </div>

          {/* Plan Info */}
          <div className="rounded-2xl p-6 flex flex-col justify-between
            bg-white/10 dark:bg-black/20
            backdrop-blur-xl
            border border-white/10
            shadow-lg">

            <div>
              <h2 className="text-lg font-semibold mb-2">
                {plan.name} Plan Limits
              </h2>
              <p className="text-sm opacity-70">
                Remaining videos: {remainingVideos}
              </p>
              <p className="text-sm opacity-70">
                Remaining images: {remainingImages}
              </p>
            </div>

            {!nextPlan && (
              <p className="text-base text-yellow-500">
                Higher plans coming soon..
              </p>
            )}

            {nextPlan && (
              <Link href="/billings">
                <button className="btn btn-primary mt-6 w-full rounded-xl">
                  Upgrade to {nextPlan.name}
                </button>
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
