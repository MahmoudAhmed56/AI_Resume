import PremiumModal from "@/components/premium/PremiumModal";
import Navbar from "./Navbar";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const { premiumModal } = translation;
  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);
  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal
          resumeBuilder={premiumModal.resumeBuilder}
          getPremium={premiumModal.getPremium}
          premium={premiumModal.premium}
          premiumPlus={premiumModal.premiumPlus}
          getPremiumPlus={premiumModal.getPremiumPlus}
          getPremiumButton={premiumModal.getPremiumButton}
          locale={locale}
        />
      </div>
    </SubscriptionLevelProvider>
  );
};

export default Layout;
