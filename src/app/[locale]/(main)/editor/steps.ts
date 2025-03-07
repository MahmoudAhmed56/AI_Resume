import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import LanguagesForm from "./forms/LanguagesForm";
import SummaryForm from "./forms/SummaryForm";
import SummaryForm from "./forms/LinksForm";
import ProjectsForm from "./forms/ProjectsForm";

export const steps: {
  title: { English: string; Arabic: string; };
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: {English:"General info",Arabic:"معلومات عامة"}, component: GeneralInfoForm, key: "General-info" },{
    title:{English:"Personal info",Arabic:"معلومات شخصية"},component: PersonalInfoForm,key:"Personal-info"
  },
  {title:{English:"Work experience",Arabic:"الخبرة العملية"},component: WorkExperienceForm,key:"Work-experience"},
  {title:{English:"Projects",Arabic:"المشاريع"},component: ProjectsForm,key:"Projects"},
  {title:{English:"Education",Arabic:"التعليم"},component: EducationForm,key:"Education"},
  {title:{English:"Skills",Arabic:"المهارات"},component: SkillsForm,key:"Skills"},
  {title:{English:"Languages",Arabic:"اللغات"},component: LanguagesForm,key:"Languages"},
  {title:{English:"Links",Arabic:"الروابط"},component: LinksForm,key:"Links"},
  {title:{English:"Summary",Arabic:"الملخص"},component: SummaryForm,key:"Summary"},
];
