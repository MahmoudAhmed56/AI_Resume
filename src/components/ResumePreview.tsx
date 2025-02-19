import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      </div>
    </div>
  );
};

export default ResumePreview;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
function PersonalInfoHeader({resumeData}:ResumeSectionProps) {
  const {phone,firstName,lastName,jobTitle,city,country,photo,email} = resumeData;
  const [photoSrc,setPhotoSrc] = useState(photo instanceof File ? "": photo)
  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ""
    if(objectUrl) setPhotoSrc(objectUrl)
    if(photo === null) setPhotoSrc("")
  
    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [photo])
  return(
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
      <div className="space-y-2.5">
      <div className="space-y-1">
          <p
            className="text-3xl font-bold"
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
          >
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {country}
          {country && city ? ", ": ""}
          {city}
          {(city||country) && (phone || email) ? " • " : ""}
          {[phone,email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  )
}