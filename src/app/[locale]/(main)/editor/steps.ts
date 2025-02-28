import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";

export const steps: {
  title: { English: string; Arabic: string; };
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: {English:"General info",Arabic:"معلومات عامة"}, component: GeneralInfoForm, key: "General-info" },{
    title:{English:"Personal info",Arabic:"معلومات شخصية"},component: PersonalInfoForm,key:"Personal-info"
  },
  {title:{English:"Work experience",Arabic:"الخبرة العملية"},component: WorkExperienceForm,key:"Work-experience"},
  {title:{English:"Education",Arabic:"التعليم"},component: EducationForm,key:"Education"},
  {title:{English:"Skills",Arabic:"المهارات"},component: SkillsForm,key:"Skills"},
  {title:{English:"Summary",Arabic:"الملخص"},component: SummaryForm,key:"Summary"},
];
