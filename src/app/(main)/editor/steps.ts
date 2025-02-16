import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";

export const steps: {
  title: string;
  component: React.ComponentType;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "General-info" },{
    title:"Personal info",component: PersonalInfoForm,key:"Personal-info"
  }
];
