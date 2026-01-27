"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface User {
  userId: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  imageCount: number;
  videoCount: number;
  isSubscribed: boolean;
}

const MAX_FREE_VIDEOS = 5;
const MAX_FREE_IMAGES = 10;

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
    } catch (err) {
      console.log(err);
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

  const remainingVideos = Math.max(MAX_FREE_VIDEOS - user.videoCount, 0);
  const remainingImages = Math.max(MAX_FREE_IMAGES - user.imageCount, 0);

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto p-6 max-w-6xl space-y-10">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          Dashboard
        </h1>

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
                {user.isSubscribed ? "Elite" : "Free"}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6
            bg-white/10 dark:bg-black/20
            backdrop-blur-xl
            border border-white/10
            shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Usage Summary
            </h2>

            <p className="text-sm mb-1">
              Videos used: {user.videoCount} / {MAX_FREE_VIDEOS}
            </p>
            <div className="w-full bg-white/10 h-2 rounded mb-4 overflow-hidden">
              <div
                className="bg-primary h-2"
                style={{
                  width: `${(user.videoCount / MAX_FREE_VIDEOS) * 100}%`,
                }}
              />
            </div>

            <p className="text-sm mb-1">
              Images used: {user.imageCount} / {MAX_FREE_IMAGES}
            </p>
            <div className="w-full bg-white/10 h-2 rounded overflow-hidden">
              <div
                className="bg-secondary h-2"
                style={{
                  width: `${(user.imageCount / MAX_FREE_IMAGES) * 100}%`,
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
                Upgrade to Elite
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
