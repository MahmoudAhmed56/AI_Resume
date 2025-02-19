import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
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
        <h1 className="p-6 text-3xl font-bold">ppp</h1>
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
  
}