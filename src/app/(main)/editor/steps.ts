import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "General-info" },{
    title:"Personal info",component: PersonalInfoForm,key:"Personal-info"
  },
  {title:"Work experience",component: WorkExperienceForm,key:"Work-experience"}
];
