import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import UserButton from "./_components/UserButton";
import ThemeToggle from "@/components/ThemeToggle";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./_components/LanguageSwitcher";



const Navbar = async () => {
  const locale = await getCurrentLocale()
  const {navbar} = await getTrans(locale)
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href={`/${locale}/resumes`} className="flex items-center gap-2">
          <Image
            src={logo}
            alt={"logo"}
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
          {navbar.navLogo}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle translation={navbar}locale={locale}/>
          <UserButton/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
