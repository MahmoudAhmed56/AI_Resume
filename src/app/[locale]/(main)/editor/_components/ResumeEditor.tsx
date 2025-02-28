"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "../steps";
import Breadcrumbs from "../Breadcrumbs";
import Footer from "../Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "../ResumePreviewSection";
import { cn, mapToResumeValues } from "@/lib/utils";
import useAutoSaveResume from "../useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";
import { EditorPage } from "@/lib/translationsTypes";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
  translation: EditorPage;
}

const ResumeEditor = ({ resumeToEdit,translation }: ResumeEditorProps) => {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );

  const [showSmResumePreview, setShowSmResumePreview] =
    useState<boolean>(false);
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);
  const currentStep = searchParams.get("step") || steps[0].key;
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }
  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">{translation.header.title}</h1>
        <p className="text-sm text-muted-foreground">
        {translation.header.subtitle}
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
                translation={translation}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            className={cn(showSmResumePreview && "flex")}
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
        translation={translation.Footer}
      />
    </div>
  );
};

export default ResumeEditor;
