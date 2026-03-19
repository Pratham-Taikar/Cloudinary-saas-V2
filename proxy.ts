import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/* ================= PUBLIC ROUTES ================= */
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",

  // Allowed for ALL users
  "/billings",
  "/contact",
  "/info",

  // Docs (IMPORTANT)
  "/docs",
  "/docs(.*)",

]);

/* ================= PUBLIC API ================= */
const isPublicApiRoute = createRouteMatcher([
  "/api/videos",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;

  const isApiRequest = pathname.startsWith("/api");

  /* ================= PROTECT HOME ================= */
  if (!userId && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  /* ================= NOT LOGGED IN ================= */
  if (!userId) {
    // Protect pages
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Protect APIs
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  /* ================= LOGGED IN USERS ================= */
  if (userId && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
});

/* ================= MATCHER ================= */
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};