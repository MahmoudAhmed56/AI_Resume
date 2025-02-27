import PremiumModal from "@/components/premium/PremiumModal";
import Navbar from "./Navbar";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";
import { Locale } from "@/i18n.config";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const Layout = async({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale:Locale}>
}>)  => {
  const {userId} = await auth()
  if(!userId){
    return null;
  }
  const locale = (await params).locale
  const userSubscriptionLevel = await getUserSubscriptionLevel(userId)
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  )
}

export default Layout