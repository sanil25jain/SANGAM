import type { ProjectProfile } from "../../app/types/project";
import type { Scheme } from "../../app/data/schemes/scheme-types";

export type SchemeMatch = {
  scheme: Scheme;

  score: number;

  matchedCriteria: string[];

  confidence: "high" | "medium" | "low";
};

export function matchSchemes(
  project: ProjectProfile,
  schemes: Scheme[]
): SchemeMatch[] {
  return schemes
    .map((scheme) => {
      let score = 0;

      const matchedCriteria: string[] = [];

      /*
       * Sector
       */
      if (scheme.sectors.includes(project.sector)) {
        score += 35;

        matchedCriteria.push("Sector");
      }

      /*
       * Project stage
       */
      if (
        scheme.projectStages.includes(
          project.projectStage
        )
      ) {
        score += 20;

        matchedCriteria.push("Project stage");
      }

      /*
       * State
       */
      if (
        project.state !== undefined &&
        Array.isArray(scheme.states) &&
        scheme.states.includes(project.state as string)
      ) {
        score += 20;

        matchedCriteria.push("Location");
      }

      /*
       * Investment
       */
      if (
        scheme.minInvestment !== undefined &&
        project.investmentAmount >=
          scheme.minInvestment
      ) {
        score += 15;

        matchedCriteria.push("Investment threshold");
      }

      /*
       * Maximum investment
       */
      if (
        scheme.maxInvestment !== undefined &&
        project.investmentAmount <=
          scheme.maxInvestment
      ) {
        score += 10;

        matchedCriteria.push("Investment limit");
      }

      /*
       * Employment
       */
      if (
        scheme.minEmployees !== undefined &&
        project.employeeCount >=
          scheme.minEmployees
      ) {
        score += 10;

        matchedCriteria.push("Employment");
      }

      score = Math.min(score, 100);

      let confidence: SchemeMatch["confidence"];

      if (score >= 70) {
        confidence = "high";
      } else if (score >= 40) {
        confidence = "medium";
      } else {
        confidence = "low";
      }

      return {
        scheme,
        score,
        matchedCriteria,
        confidence,
      };
    })

    /*
     * Don't show completely irrelevant schemes.
     */
    .filter((match) => match.score >= 40)

    /*
     * Best matches first.
     */
    .sort((a, b) => b.score - a.score);
}