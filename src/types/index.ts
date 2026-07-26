export interface UniversityResult {
  id: string;
  name: string;
  country: string;
  ranking: number;
  programs: string[];
  description: string;
}

export interface StudyProfile {
  id: string;
  name: string;
  email: string;
  age: string;
  gender: string;
  phone: string;
  schoolName: string;
  highestEducation: string;
  curriculum: string;
  otherCurriculum?: string;
  preferMozambique: boolean;
  interests: string[];
  personalityTraits: string[];
  academicStrengths: string[];
  studyGoals: string[];
}

export interface Recommendations {
  bestCourse: string;
  topCountries: string[];
  universities: UniversityResult[];
}


export type NavigationPage =
  | "home"
  | "Inicio"
  | "Explorar"
  | "explorar"
  | "Paralelas"
  | "paralelas"
  | "Legal"
  | "legal"
  | "Recursos"
  | "recursos"
  | "contacto"
  | "KnownCourse"
  | "VocationalQuiz";


  export interface UserProfile {
  name: string;
  email: string;
  age: string;
  gender: string;
  phone?: string;
  schoolName?: string;
  highestEducation?: string;
  curriculum?: string;
  otherCurriculum?: string;
  interests?: string[];
  personalityTraits?: string[];
  academicStrengths?: string[];
  studyGoals?: string[];
}

export interface Career {
  id: string;
  title: string;
  description: string;
  demandLevel: "low" | "medium" | "high";
  relatedCourses: string[];
}