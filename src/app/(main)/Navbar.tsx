import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import UserButton from "./_components/UserButton";
import ThemeToggle from "@/components/ThemeToggle";



const Navbar = () => {
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resume" className="flex items-center gap-2">
          <Image
            src={logo}
            alt={"logo"}
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle/>
          <UserButton/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
