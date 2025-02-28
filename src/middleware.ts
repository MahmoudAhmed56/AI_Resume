import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType } from "./i18n.config";

const isPublicRoute = createRouteMatcher([
  "/",
  ...i18n.locales.map((locale) => `/${locale}`),
  ...i18n.locales.map((locale) => `/${locale}/sign-in(.*)`),
  ...i18n.locales.map((locale) => `/${locale}/sign-up(.*)`),
  "/api/stripe-webhook",
]);

export default clerkMiddleware(async (auth, request) => {
  // Handle locale detection first
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
//
const requestHeaders = new Headers(request.headers);
requestHeaders.set("x-url", request.url);

//
  // Redirect to locale-specific route if missing
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  // Handle Clerk authentication after locale handling
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next({
    request:{
      headers: requestHeaders,
    }
  });
});

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch {
    return i18n.defaultLocale;
  }
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};