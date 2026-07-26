import React, { createContext, useContext, useState } from "react";

/* ------------------------------------------------------------------
   TYPES
------------------------------------------------------------------ */
export interface Trail {
  id: number;
  nome: string;
  descricao: string;
  paraQuem: "Eu" | "Outra pessoa";
  dataCriacao: string;
}

export interface KnownCourseData {
  course: string;
  alternativeCourses: string[];
  targetUniversities: string;
  preferredRegions: string;
  startDate: string;
  duration: string;
  budget: string;
  currency: string;
  livingPreference: string;
  studyMode: string;
  fundingType: string;
  desiredCountries: string[];
  visaConcerns: string;
  languages: string[];
  interests: string;
  notes: string;
}

export interface VocationalQuizData {
  personality?: string;
  strengths?: string[];
  interests?: string[];
  recommendedFields?: string[];
  // Used for raw answer storage from the quiz
  answers?: Record<number, string | string[]>;
}

/* ------------------------------------------------------------------
   CONTEXT TYPE
------------------------------------------------------------------ */
interface FormDataContextType {
  // Trails
  trails: Trail[];
  addTrail: (trail: Trail) => void;

  // Course data
  knownCourseData: KnownCourseData | null;
  setKnownCourseData: (data: KnownCourseData) => void;

  // Vocational quiz
  vocationalQuizData: VocationalQuizData | null;
  setVocationalQuizData: (data: VocationalQuizData) => void;

  // General form data (used in Step 1 personal info)
  formData: any;
  setFormData: (data: any) => void;
}

/* ------------------------------------------------------------------
   CREATE CONTEXT
------------------------------------------------------------------ */
const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

/* ------------------------------------------------------------------
   PROVIDER
------------------------------------------------------------------ */
export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [knownCourseData, setKnownCourseData] = useState<KnownCourseData | null>(null);
  const [vocationalQuizData, setVocationalQuizData] = useState<VocationalQuizData | null>(null);
  const [formData, setFormData] = useState({});

  const addTrail = (trail: Trail) => setTrails((prev) => [trail, ...prev]);

  return (
    <FormDataContext.Provider
      value={{
        trails,
        addTrail,
        knownCourseData,
        setKnownCourseData,
        vocationalQuizData,
        setVocationalQuizData,
        formData,
        setFormData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

/* ------------------------------------------------------------------
   HOOK
------------------------------------------------------------------ */
export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
