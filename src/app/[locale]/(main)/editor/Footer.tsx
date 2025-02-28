import { Button } from "@/components/ui/button";
import { steps } from "./steps";
import { FileUser, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving:boolean;
  translation:{
    previousStep: string;
    nextStep: string;
    close: string;
    saving: string;
    showInputForm: string;
    showResumePreview: string;
}
}

const Footer = ({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
  translation
}: FooterProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep || showSmResumePreview}
          >
            {translation.previousStep}
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep || showSmResumePreview}
          >
            {translation.nextStep}
          </Button>
        </div>
        <Button
        variant={"outline"}
        size={"icon"}
        onClick={()=>setShowSmResumePreview(!showSmResumePreview)}
        className="md:hidden"
          title={
            showSmResumePreview ? `${translation.showInputForm}` : `${translation.showResumePreview}`
          }
        >
          {showSmResumePreview ? <PenLine /> : <FileUser />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">{translation.close}</Link>
          </Button>
          <p className={cn("text-muted-foreground opacity-0",
          isSaving && "opacity-100"
          )}>{translation.saving}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
