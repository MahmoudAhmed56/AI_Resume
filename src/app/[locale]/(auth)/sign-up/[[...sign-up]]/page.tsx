import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { SignUp } from "@clerk/nextjs";

const Page = async () => {
  const locale = await getCurrentLocale()
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp
      signInUrl={`/${locale}/sign-in`}
      fallbackRedirectUrl={`/${locale}/resumes`}
      appearance={{
        elements: {
          card: "shadow-none border",
          headerTitle: "text-2xl font-bold",
          socialButtonsBlockButton: "hover:bg-secondary/80"
        }
      }}
    
      />
    </main>
  );
};

export default Page;
