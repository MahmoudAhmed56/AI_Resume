import PremiumModal from "@/components/premium/PremiumModal";
import Navbar from "./Navbar";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";
import { ClerkProvider } from "@clerk/nextjs";

const Layout = async({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  => {
  const {userId} = await auth()
  if(!userId){
    return null;
  }
  const userSubscriptionLevel = await getUserSubscriptionLevel(userId)
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <ClerkProvider>
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <PremiumModal />
    </div>
    </ClerkProvider>
    </SubscriptionLevelProvider>
  )
}

export default Layout