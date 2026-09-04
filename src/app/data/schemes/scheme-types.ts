import type {
  IndustrySector,
  ProjectStage,
} from "../../types/project";

export type Scheme = {
  id: string;

  name: string;

  authority: string;

  category: string;

  description: string;

  benefit: string;

  eligibility: string[];

  sectors: IndustrySector[];

  projectStages: ProjectStage[];

  minInvestment?: number;

  maxInvestment?: number;

  minEmployees?: number;

  states: string[];

  officialSource: string;

  applicationUrl?: string;

  lastVerified: string;
};