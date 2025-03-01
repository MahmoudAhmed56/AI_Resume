import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Link from "next/link";

const page = async() => {
  const locale = await getCurrentLocale()
  const translation = await getTrans(locale)
  const {billing} =  translation
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">{billing.title}</h1>
      <p>
      {billing.subtitle}
      </p>
      <Button asChild>
        <Link href={`/${locale}/resumes`}>{billing.button}</Link>
      </Button>
    </main>
  );
}

export default page