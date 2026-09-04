import type { GovernmentScheme } from "../../app/types/scheme";
import type { ProjectProfile } from "../../app/types/project";

export function getMatchingSchemes(
  project: ProjectProfile,
  schemes: GovernmentScheme[]
): GovernmentScheme[] {
  return schemes.filter((scheme) => {
    const sectorMatch =
      scheme.sectors.length === 0 ||
      scheme.sectors.includes(project.sector);

    const stateMatch =
      scheme.states.length === 0 ||
      scheme.states.includes(project.state);

    const minInvestmentMatch =
      scheme.minInvestment === undefined ||
      project.investmentAmount >= scheme.minInvestment;

    const maxInvestmentMatch =
      scheme.maxInvestment === undefined ||
      project.investmentAmount <= scheme.maxInvestment;

    return (
      sectorMatch &&
      stateMatch &&
      minInvestmentMatch &&
      maxInvestmentMatch &&
      scheme.status === "open"
    );
  });
}