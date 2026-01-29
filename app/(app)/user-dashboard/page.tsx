"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import services from "@/lib/services";
interface User {
  userId: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  imageCount: number;
  videoCount: number;
  isSubscribed: boolean;
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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!user) return <div className="text-center">User not found</div>;
  
  const plan = user.isSubscribed ? services.elite : services.free;

  const remainingVideos = Math.max(
    plan.videoLimit - user.videoCount,
    0
  );

  const remainingImages = Math.max(
    plan.imageLimit - user.imageCount,
    0
  );

  const imagelimitReached = remainingImages === 0 
  const videoLimitReached = remainingVideos === 0

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto p-6 max-w-6xl space-y-10">
        { imagelimitReached && videoLimitReached && (
          <div className="text-center text-red-500 font-semibold text-xl">
            Your plan has reached maximum uploads. Please upgrade to increase upload limit.
          </div>
        )}

        <div className="flex items-center gap-6 rounded-2xl p-6
          bg-white/10 dark:bg-black/20
          backdrop-blur-xl
          border border-white/10
          shadow-lg">
          {user.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-20 h-20 rounded-full ring-2 ring-white/20"
            />
          )}
          <div>
            <p className="text-xl font-semibold">
              {user.username || "User"}
            </p>
            <p className="text-md opacity-70">{user.email}</p>
            <p className="mt-2 text-sm">
              Plan:{" "}
              <span className="font-semibold">
                {plan.name}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-2xl p-6
            bg-white/10 dark:bg-black/20
            backdrop-blur-xl
            border 
            shadow-lg
            ${ imagelimitReached && videoLimitReached ? "border-red-500" : "border-white/10"}
            `}>
            <h2 className="text-lg font-semibold mb-4">
              Usage Summary
            </h2>
            <p className="text-sm mb-1">
              Videos used: {user.videoCount} / {plan.videoLimit}
            </p>
            <div className="w-full bg-white/10 h-2 rounded mb-4 overflow-hidden">
              <div
                className={`h-2
                  ${ videoLimitReached ? "bg-red-500" : "bg-primary" }
                  `}
                style={{
                  width: `${Math.min(
                    (user.videoCount / plan.videoLimit) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <p className="text-sm mb-1">
              Images used: {user.imageCount} / {plan.imageLimit}
            </p>
            <div className="w-full bg-white/10 h-2 rounded overflow-hidden">
              <div
                className={`h-2
                  ${ imagelimitReached ? "bg-red-500" : "bg-secondary" }
                  `}
                style={{
                  width: `${Math.min(
                    (user.imageCount / plan.imageLimit) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl p-6 flex flex-col justify-between
            bg-white/10 dark:bg-black/20
            backdrop-blur-xl
            border border-white/10
            shadow-lg">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Free Plan Limits
              </h2>
              <p className="text-sm opacity-70">
                Remaining videos: {remainingVideos}
              </p>
              <p className="text-sm opacity-70">
                Remaining images: {remainingImages}
              </p>
            </div>

            {!user.isSubscribed && (
              <button className="btn btn-primary mt-6 rounded-xl">
                Upgrade to {services.elite.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
