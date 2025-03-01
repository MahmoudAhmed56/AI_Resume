"use client";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCheckoutSession } from "./actions";
import { LanguageType } from "@/i18n.config";
// import { env } from "@/env";

const premiumFeatures = [
  { English: "AI tools", Arabic: "أدوات الذكاء الاصطناعي" },
  { English: "Up to 5 resumes", Arabic: "ما يصل إلى 5 من السير الذاتية" },
];
const premiumPlusFeatures = [
  { English: "Infinite resumes", Arabic: "عدد لا نهائي من السير الذاتبة" },
  { English: "Design customizations", Arabic: "إتاحة تخصيصات التصميم" },
];
interface PremiumModalProps {
  resumeBuilder: string;
  getPremium: string;
  premium: string;
  premiumPlus: string;
  getPremiumButton: string;
  getPremiumPlus: string;
  locale: LanguageType;
}
const PremiumModal = ({
  getPremium,
  getPremiumPlus,
  premium,
  premiumPlus,
  getPremiumButton,
  resumeBuilder,
  locale
}: PremiumModalProps) => {
  const { open, setOpen } = usePremiumModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  async function handelPremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">{resumeBuilder}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>{getPremium}</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">{premium}</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {locale === "ar" ? feature.Arabic :feature.English}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  handelPremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!,
                  )
                }
                disabled={loading}
              >
                {getPremiumButton}
              </Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                {premiumPlus}
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {locale === "ar" ? feature.Arabic :feature.English}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  handelPremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!,
                  )
                }
                disabled={loading}
                variant="premium"
              >
                {getPremiumPlus}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
