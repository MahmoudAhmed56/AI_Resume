import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

const ResumePreview = ({ resumeData, className }: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <ExperienceSection resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { phone, firstName, lastName, jobTitle, city, country, photo, email } =
    resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);
  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);
  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="author photo"
          className="aspect-square object-cover"
        />
      )}
      <div className={cn(`space-y-2.5`, !photoSrc ? "mx-auto" : "")}>
        <div className="space-y-1">
          <p
            className={cn(
              "text-3xl font-bold",
              !photoSrc ? "flex justify-center" : "",
            )}
          >
            {firstName} {lastName}
          </p>
          <p
            className={cn(
              "font-medium",
              !photoSrc ? "flex justify-center" : "",
            )}
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {country}
          {country && city ? ", " : ""}
          {city}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Summary</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function ExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;
  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;
  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Work experience</p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (<span>
                {formatDate(exp.startDate,"MM/yyyy")} - {" "}
                {exp.endDate ? formatDate(exp.endDate,"MM/yyyy") : ""}
              </span>)}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
