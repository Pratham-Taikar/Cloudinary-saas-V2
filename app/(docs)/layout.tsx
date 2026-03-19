"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { MenuIcon, LogOutIcon, UserCog } from "lucide-react";

const sidebarItems = [
  {
    section: "Introduction",
    items: [
      { href: "/docs/overview", label: "Overview" },
      { href: "/docs/getting-started", label: "Getting Started" },
    ],
  },
  {
    section: "Core Features",
    items: [
      { href: "/docs/image-processing", label: "Image Processing" },
      { href: "/docs/video-compression", label: "Video Compression" },
      { href: "/docs/background-removal", label: "Background Removal" },
      { href: "/docs/generative-background", label: "Generative Background" },
      { href: "/docs/image-aspect-ratios", label: "Image Aspect Ratios" },
    ],
  },
  {
    section: "Guides",
    items: [
      { href: "/docs/authentication", label: "Authentication" },
      { href: "/docs/dashboard", label: "Dashboard" },
      { href: "/docs/billing-upgrades", label: "Billing & Upgrades" },
    ],
  },
  {
    section: "Setup & Ops",
    items: [
      { href: "/docs/environment-setup", label: "Environment Setup" },
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    section: "Reference",
    items: [
      { href: "/docs/api-reference", label: "API Reference" },
      { href: "/docs/plans-limits", label: "Plans & Limits" },
    ],
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-white">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-black/30 backdrop-blur-xl">
        {/* LOGO */}
        <div className="p-6 cursor-pointer" onClick={handleLogoClick}>
          <img src="/saaslogo.png" alt="logo" className="w-36" />
        </div>

        {/* NAV */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {sidebarItems.map((section, i) => (
            <div key={i} className="mb-6">
              <p className="text-md text-white/40 uppercase mb-3 tracking-wider">
                {section.section}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg text-md transition ${
                      pathname === item.href
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* USER SECTION */}
        {user && (
          <div className="p-4 border-t border-white/10">
            <Link
              href="/user-dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-md hover:bg-white/10"
            >
              <UserCog className="w-4 h-4" />
              Dashboard
            </Link>

            <button
              onClick={() => signOut()}
              className="mt-3 w-full flex items-center justify-center gap-2 text-md py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30"
            >
              <LogOutIcon className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="absolute left-0 top-0 h-full w-64 bg-black p-6">
          {sidebarItems.map((section, i) => (
            <div key={i} className="mb-6">
              <p className="text-md text-white/40 mb-3">{section.section}</p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="block py-2 text-white/70"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAV */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/30 backdrop-blur-xl">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </button>

            <p className="text-md text-white/60">Documentation</p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {user && (
              <img
                src={user.imageUrl}
                className="w-8 h-8 rounded-full"
                alt="user"
              />
            )}
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-6 py-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
