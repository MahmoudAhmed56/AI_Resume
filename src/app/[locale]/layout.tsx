import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cairo } from 'next/font/google';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Languages, Locale } from "@/i18n.config";
import { enUS, arSA } from "@clerk/localizations";
const inter = Inter({ subsets: ["latin"],variable: '--font-inter', });
const cairo = Cairo({
  subsets: ['latin', 'arabic'], // Subset for reduced file size
  weight: ['200', '400', '700'], // Specify required weights
  display: 'swap', // Prevent layout shift
  adjustFontFallback: false, // Disable automatic fallback
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: {
    template: "%s - AI Resume Builder",
    absolute: "AI Resume Builder",
  },
  description:
    "AI Resume Builder is the easiest way to create professional resume that will help you land your dream job.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale:Locale}>
}>) {
  const locale = (await params).locale
  return (
    <ClerkProvider
    localization={locale === "ar" ? arSA : enUS}
  appearance={{
    variables: {
      fontFamily: locale === Languages.ARABIC 
        ? "'Cairo', sans-serif" 
        : "'Inter', sans-serif"
    }
  }}
  afterSignOutUrl={`/${locale}`}
    >
      <html 
        lang={locale} 
        dir={locale === Languages.ARABIC ? "rtl" : "ltr"} 
        suppressHydrationWarning
      >
        <body className={`${cairo.variable} ${inter.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}