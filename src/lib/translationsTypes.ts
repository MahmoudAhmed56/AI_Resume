export interface AppContent {
  navLogo: string;
  home: {
    firstTitle: string;
    secondTitle: string;
    thirdTitle: string;
    subParagraph1: string;
    subParagraph2: string;
    subParagraph3: string;
    button: string;
  };
  resumesPage: {
    newResumeButton: string;
    title: string;
    total: string;
  };
  editorPage: {
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
      Languages: string;
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
      placeholder: string;
    };
    Summary: {
      title: string;
      subtitle: string;
      placeholder: string;
    };
    Footer: {
      previousStep: string;
      nextStep: string;
      close: string;
      saving: string;
      showInputForm: string;
      showResumePreview: string;
    };
    Languages: {
      title: string;
      subtitle: string;
      language: string;
      level: string;
      addLanguageButton: string;
    };
    Project : {
      title: string;
      subtitle: string;
      project: string;
      project_name: string;
      linkTitle: string;
      linkURL: string;
      addLink: string;
      description: string;
      addProjectButton: string;
      removeButton: string;
    };
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
    noTitle: string;
    updated: string;
    created: string;
  };
  resumePreview: {
    summary: string;
    workExperience: string;
    present: string;
    education: string;
    skills: string;
    languages: string;
  };
  premiumModal: {
    resumeBuilder: string;
    getPremium: string;
    premium: string;
    premiumPlus: string;
    getPremiumButton: string;
    getPremiumPlus: string;
  };
  billing: {
    title: string;
    subtitle: string;
    button: string;
  };
}
export interface resumePreviewTrans {
  summary: string;
  workExperience: string;
  present: string;
  education: string;
  skills: string;
  languages: string;
};
export interface Project {
  title: string;
  subtitle: string;
  project: string;
  project_name: string;
  linkTitle: string;
  linkURL: string;
  addLink: string;
  description: string;
  addProjectButton: string;
  removeButton: string;
}