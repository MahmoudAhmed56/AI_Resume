import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { steps } from "./steps";
import React from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const Breadcrumbs = ({ currentStep, setCurrentStep }: BreadcrumbsProps) => {
  const {locale} = useParams()
  return (
    <div className="flex justify-center">
      <Breadcrumb>
      <BreadcrumbList>
      {steps.map((step)=>{
        return(
          <React.Fragment key={step.key}>
          <BreadcrumbItem>
          {step.key === currentStep ? (
            <BreadcrumbPage>
            {locale === "en" ? step.title.English: step.title.Arabic}
            </BreadcrumbPage>
          ):(
            <BreadcrumbLink asChild>
              <button onClick={()=>{
                setCurrentStep(step.key)
              }}>
                {locale === "en" ? step.title.English: step.title.Arabic}
              </button>
            </BreadcrumbLink>
          )}
          </BreadcrumbItem>
          <BreadcrumbSeparator className={cn("last:hidden",locale === "ar" ? "rotate-180":"")}/>
          </React.Fragment>
        )
      })}
      </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
