import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";
import { AppContent } from "./translationsTypes";


export interface EditorFormProps{
  resumeData: ResumeValues;
  setResumeData: (data:ResumeValues)=>void;
  translation: AppContent
}

export const resumeDataInclude ={
  workExperiences: true,
  educations:true,
  languages:true,
  links:true,
  projects: {
    include: {
      projectLinks: true
    }
  },
} satisfies Prisma.ResumeInclude

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude
}>