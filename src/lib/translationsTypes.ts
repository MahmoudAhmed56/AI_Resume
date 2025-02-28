export type EditorPage = {
  header: {
    title: string;
    subtitle: string;
  };
  steps: {
    GeneralInfo: string;
    PersonalInfo: string;
    WorkExperience: string;
    Education: string;
    Skills: string;
    Summary: string;
  };
  GeneralInfo: {
    title: string;
    subtitle: string;
    ProjectName: string;
    Description: string;
    Describe: string;
  };
  PersonalInfo: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    removeButton:string
    photo:string
  };
  WorkExperience: {
    title: string;
    subtitle: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    dateMessage: string;
    description: string;
    addWorkExperienceButton: string;
  };
  Education: {
    title: string;
    subtitle: string;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    removeButton: string;
    addEducationButton: string;
  };
  Skills: {
    title: string;
    subtitle: string;
    textareaMessage: string;
  };
  Summary: {
    title: string;
    subtitle: string;
  };
};