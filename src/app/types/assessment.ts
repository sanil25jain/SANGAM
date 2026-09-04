import { Approval } from "./approval";

export type IndustrySector =
  | "manufacturing"
  | "food_processing"
  | "textile"
  | "pharmaceutical"
  | "it"
  | "construction"
  | "automotive"
  | "chemical"
  | "other";

export type ProjectStage =
  | "new_setup"
  | "expansion"
  | "modernization"
  | "operational";

export type LandStatus =
  | "owned"
  | "leased"
  | "to_be_acquired"
  | "industrial_estate";

export interface ProjectProfile {
  name: string;

  sector: IndustrySector;

  projectStage: ProjectStage;

  investmentAmount: number;

  state: string;

  district: string;

  landStatus: LandStatus;

  builtUpArea: number;

  employeeCount: number;

  requiresConstruction: boolean;

  requiresElectricity: boolean;

  requiresWater: boolean;

  generatesWaste: boolean;

  usesHazardousMaterials: boolean;

  requiresBoiler: boolean;

  requiresFactoryLicense: boolean;
}

export interface ApprovalAssessment {
  approval: Approval;
  applicability:
    | "required"
    | "conditional"
    | "not_required";
  reason: string;
  confidence: number;
}

export type ApprovalApplicability =
  | "required"
  | "conditional"
  | "not_required";

export interface ApprovalAssessment {
  approval: Approval;
  applicability: ApprovalApplicability;
  reason: string;
  confidence: number;
}