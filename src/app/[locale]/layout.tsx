import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Languages, Locale } from "@/i18n.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - AI Resume Builder",
    absolute: "AI Resume Builder",
  },
  description:
    "AI Resume Builder is the easiest way to create professional resume that will help you land your dream job.",
};
export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}
export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale:Locale}>
}>) {
  const locale = (await params).locale
  return (
    <ClerkProvider>
      <html lang={locale} dir={locale === Languages.ARABIC ? "rtl" : "ltr"} suppressHydrationWarning>
        <body className={inter.className}>
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
