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
    projectName: string;
    projectNamePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    describe: string;
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
    removeButton: string;
    photo: string;
  };
  WorkExperience: {
    title: string;
    subtitle: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    dateMessage1: string;
    dateMessage2: string;
    dateMessage3: string;
    description: string;
    addWorkExperienceButton: string;
    removeButton: string;
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
  Footer: {
    previousStep: string;
    nextStep: string;
    close: string;
    saving: string;
    showInputForm: string;
    showResumePreview: string;
  };
  billingPage: {
    somethingWentWrong: string;
    manageSubscription: string;
    canceledSubscription: string;
    billing: string;
    yourCurrentPlan: string;
  };
  errors: {
    somethingWentWrong: string;
    couldNotSave: string;
    retry: string;
  };
  resumeItem: {
    delete: string;
    print: string;
    deleteResume: string;
    dialogDescription: string;
    cancel: string;
    noTitle:string;
    updated:string;
    created:string;
  };
};
