import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const hasClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)',
  '/_next(.*)',
  '/favicon.ico',
  '/icon(.*)',
  '/apple-icon.png',
  '/robots.txt',
  '/sitemap.xml',
])

export default clerkMiddleware((auth, req) => {
  if (!hasClerkKeys) {
    console.error(
      '[middleware] Missing Clerk environment variables. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY.'
    )
    return
  }

  if (!isPublicRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
