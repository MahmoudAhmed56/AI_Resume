import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import resumePreview from "@/assets/resume-preview.jpg";
import getTrans from "@/lib/translation";
import { headers } from "next/headers";
import { Locale } from "@/i18n.config";

export default async function Home() {
  const url = (await headers()).get("x-url")
  const locale = url?.split("/")[3] as Locale
  const {welcome} = await getTrans(locale)
  console.log(locale);
  console.log(welcome);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
      <div className="max-w-prose space-y-3">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create the{" "}
          <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Perfect Resume
          </span>{" "}
          in Minutes
        </h1>
        <p className="text-lg text-gray-500">
        {welcome} Our <span className="font-bold">AI resume builder</span> helps you
          design a professional resume, even if you&apos;re not very smart.
        </p>
        <Button asChild size="lg" variant="premium">
          <Link href="/resumes">Get started</Link>
        </Button>
      </div>
      <div>
        <Image
          src={resumePreview}
          alt="Resume preview"
          width={600}
          className="shadow-md lg:rotate-[1.5deg]"
        />
      </div>
    </main>
  );
}
