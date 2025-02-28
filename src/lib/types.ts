import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";
import { EditorPage } from "./translationsTypes";

export interface EditorFormProps{
  resumeData: ResumeValues;
  setResumeData: (data:ResumeValues)=>void;
  translation: EditorPage
}

export const resumeDataInclude ={
  workExperiences: true,
  educations:true
} satisfies Prisma.ResumeInclude

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude
}>