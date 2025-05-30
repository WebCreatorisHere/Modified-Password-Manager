// middleware.js
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Public routes that don't require authentication
const isProtectedRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  // Only protect non-public routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API and tRPC routes
    '/(api|trpc)(.*)',
  ],
};
