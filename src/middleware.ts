import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n.config";

const isPublicRoute = createRouteMatcher([
  "/",
  ...i18n.locales.map((locale) => `/${locale}`),
  ...i18n.locales.map((locale) => `/${locale}/sign-in(.*)`),
  ...i18n.locales.map((locale) => `/${locale}/sign-up(.*)`),
  "/api/stripe-webhook",
]);

export default clerkMiddleware(async (auth, request) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  const pathname2 = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname2.startsWith(`/${locale}`),
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname2}`, request.url));
  }
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
  return NextResponse.next({
    headers: requestHeaders,
  });
});

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    locale = i18n.defaultLocale;
  }
  return locale;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
// Get the preferred locale, similar to the above or using a library
// export async function middleware(request: NextRequest) {
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-url", request.url);
//   const pathname2 = request.nextUrl.pathname;
//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) => !pathname2.startsWith(`/${locale}`),
//   );
//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);
//     return NextResponse.redirect(new URL(`/${locale}${pathname2}`, request.url));
//   }

//   return NextResponse.next({
//     headers: requestHeaders,
//   });
// }
