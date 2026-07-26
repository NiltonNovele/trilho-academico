// import { StudyProfile, UniversityResult } from '../../types';

// /**
//  * Download the study plan as a JSON or formatted text file.
//  */
// export const downloadStudyPlan = (profile: StudyProfile, recommendations: any) => {
//   // Create a formatted text for the study plan
//   const content = `
// --- Personalized Study Plan ---
// Name: ${profile.name}
// Email: ${profile.email}
// Phone: ${profile.phone}

// Desired Course: ${profile.desiredCourse}
// Languages: ${profile.languages}
// Budget: ${profile.budget}
// Preferred Country: ${profile.preferredCountry}
// Preferred City: ${profile.preferredCity}

// --- Top Recommendation ---
// Best Course: ${recommendations.bestCourse}

// --- Top Countries ---
// ${recommendations.topCountries.join('\n')}

// --- Matching Universities ---
// ${recommendations.universities
//     .map(
//       (uni: UniversityResult) =>
//         `${uni.name} - ${uni.country} - Ranking: ${uni.ranking}`
//     )
//     .join('\n')}
//   `;

//   // Create a blob and trigger download
//   const blob = new Blob([content], { type: 'text/plain' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'StudyPlan.txt';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
