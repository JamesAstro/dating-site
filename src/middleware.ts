import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/forgotPassword",
]);

const isAuthRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/forgotPassword",
]);

export default clerkMiddleware(async (auth, req) => {
  const { redirectToSignIn, userId, sessionId } = auth();
  const isAuthenticated = !!(userId && sessionId);

  if (!isAuthenticated && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  if (
    (isAuthenticated && isAuthRoute(req)) ||
    (isAuthenticated && isPublicRoute(req))
  ) {
    const homeUrl = new URL("/dashboard", req.url);

    return NextResponse.redirect(homeUrl);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/dashboard", "/(api|trpc)(.*)"],
};
