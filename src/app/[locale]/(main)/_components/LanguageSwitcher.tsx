"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "@/i18n.config";
const LanguageSwitcher = () => {
  const router = useRouter();

  const pathname = usePathname();
  const { locale } = useParams();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId"); // Access query parameters
  console.log(pathname, "pathname");
  const page = pathname.split("/").pop();

  const switchLanguage = (newLocale: string) => {
    if (!resumeId) {
      const path =
        pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
      router.push(path);
    } else {
      const path = pathname?.replace(
        `/${locale}/${page}`,
        `/${newLocale}/${page}/?resumeId=${resumeId}`,
      );
      router.push(path);
    }
  };
  return (
    <div className="flex">
      {locale === Languages.ARABIC ? (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          English
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )}
    </div>
  );
};
export default LanguageSwitcher;
