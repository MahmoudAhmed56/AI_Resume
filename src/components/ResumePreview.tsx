import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import { BorderStyles } from "@/app/[locale]/(main)/editor/BorderStyleButton";
import { resumePreviewTrans } from "@/lib/translationsTypes";
import Link from "./link";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  locale?: string | string[] | undefined;
  translation: resumePreviewTrans;
}

const ResumePreview = ({
  resumeData,
  className,
  contentRef,
  locale,
  translation,
}: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
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
        ref={contentRef}
        id="resumePreviewContent"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection
          resumeData={resumeData}
          translation={translation}
        />
        <ExperienceSection
          resumeData={resumeData}
          translation={translation}
        />
        <ProjectSection
          resumeData={resumeData}
          translation={translation}
        />
        <EducationSection
          resumeData={resumeData}
          translation={translation}
        />
        <SkillsSections
          resumeData={resumeData}
          translation={translation}
        />
        <LanguagesSections
          resumeData={resumeData}
          translation={translation}
        />
      </div>
    </div>
  );
};

export default ResumePreview;
interface ResumeSectionProps {
  resumeData: ResumeValues;
  translation?: resumePreviewTrans;
}
function LanguagesSections({resumeData,translation}:ResumeSectionProps) {
  const { languages, colorHex } = resumeData;
  const languagesNotEmpty = languages?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!languagesNotEmpty?.length) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          {translation?.languages}
        </p>
        {languagesNotEmpty.map((lang, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <p className="text-xs font-semibold">{lang.language}: <span className="whitespace-pre-line text-xs">{lang.level}</span></p>
          </div>
        ))}
      </div>
    </>
  );
}


function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    phone,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    photo,
    email,
    colorHex,
    borderStyle,
  } = resumeData;
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
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "999px"
                  : "10%",
          }}
        />
      )}
      <div className={cn(`space-y-2.5`, !photoSrc ? "mx-auto" : "")}>
        <div className="space-y-1">
          <p
            className={cn(
              "text-3xl font-bold",
              !photoSrc ? "flex justify-center" : "",
            )}
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className={cn(
              "font-medium",
              !photoSrc ? "flex justify-center" : "",
            )}
            style={{
              color: colorHex,
            }}
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

function SummarySection({ resumeData,translation }: ResumeSectionProps) {
  
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          {translation?.summary}
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function ExperienceSection({ resumeData,translation }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          {translation?.workExperience}
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : `${translation?.present}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
function ProjectSection({ resumeData,translation }: ResumeSectionProps) {
  const { colorHex,projects } = resumeData;
  const projectsNotEmpty = projects?.filter(
    (project) => Object.values(project).filter(Boolean).length > 0,
  );

  if (!projectsNotEmpty?.length) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          {translation?.project}
        </p>
        {projectsNotEmpty.map((project, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center flex-wrap gap-2 text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{project.project_name}{project.project_name&&":"} </span>
              {
                project.projectLinks?.map((projectLink,index)=>{
                  return(
                    <Link 
                    key={index}
                    target="_blank" href={`${projectLink.link}`} className="text-xs font-semibold text-blue-500 underline">{projectLink.title}</Link>
                  )
                })
              }
      
            </div>
            <div className="whitespace-pre-line text-xs">{project.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData,translation }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          {translation?.education}
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSections({ resumeData,translation }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          {translation?.skills}
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
