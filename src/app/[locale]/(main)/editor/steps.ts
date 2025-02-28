import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "General-info" },{
    title:"Personal info",component: PersonalInfoForm,key:"Personal-info"
  },
  {title:"Work experience",component: WorkExperienceForm,key:"Work-experience"},
  {title:"Education",component: EducationForm,key:"Education"},
  {title:"Skills",component: SkillsForm,key:"Skills"},
  {title:"Summary",component: SummaryForm,key:"Summary"},
];
