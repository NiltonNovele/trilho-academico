// src/utils/helpers.ts

import { UniversityResult, StudyProfile } from "../types";

/**
 * Generates study recommendations based on a student's profile.
 */
export const getStudyRecommendations = (
  profile: StudyProfile
): UniversityResult[] => {
  // Example: Simple logic for demo purposes
  const recommendations: UniversityResult[] = [
    {
      id: "1",
      name: "University of Cape Town",
      country: "South Africa",
      programs: ["Computer Science", "Engineering", "Business"],
      ranking: 120,
      description: "A leading African university known for research and innovation.",
    },
    {
      id: "2",
      name: "University of Pretoria",
      country: "South Africa",
      programs: ["Law", "Medicine", "Information Technology"],
      ranking: 180,
      description: "Strong programs with a focus on practical skills and innovation.",
    },
  ];

  // Filter based on interest if provided
  if (profile.interests && profile.interests.length > 0) {
    return recommendations.filter((uni) =>
      uni.programs.some((program) =>
        profile.interests?.includes(program.toLowerCase())
      )
    );
  }

  return recommendations;
};

/**
 * Allows users to download a generated study plan as a PDF.
 */
export const downloadStudyPlan = (recommendations: UniversityResult[]) => {
  const content = recommendations
    .map(
      (uni, index) =>
        `${index + 1}. ${uni.name} (${uni.country})\nRanking: ${
          uni.ranking
        }\nPrograms: ${uni.programs.join(", ")}\nDescription: ${
          uni.description
        }\n\n`
    )
    .join("");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "study-plan.txt";
  link.click();

  window.URL.revokeObjectURL(url);
};
