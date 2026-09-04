export type ProjectStatus =
  | "draft"
  | "assessment"
  | "assessment_pending"
  | "assessment_completed"
  | "in_progress"
  | "completed"
  | "on_hold";

export type ProjectStage =
  | "planning"
  | "land_acquisition"
  | "construction"
  | "pre_operation"
  | "operational"
  | "new_setup"
  | "expansion"
  | "modernization";

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

export type LandStatus =
  | "owned"
  | "leased"
  | "to_be_acquired"
  | "industrial_estate";

export interface ProjectProfile {
  id: string;

  name: string;

  location: string;

  industry: string;

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

export interface ProjectFormData {
  projectName: string;

  industry: string;

  location: string;

  investment: number;

  landArea: number;

  employees: number;

  powerRequirement: number;

  waterRequirement: number;

  projectStage: ProjectStage;
}

export interface Project {
  id: string;

  name?: string;

  industry?: string;

  location?: string;

  profile?: ProjectProfile;

  investment?: number;

  landArea?: number;

  employees?: number;

  powerRequirement?: number;

  waterRequirement?: number;

  projectStage?: ProjectStage;

  status: ProjectStatus;

  approvalCount?: number;

  completedApprovals?: number;

  createdAt: string;

  updatedAt?: string;
}