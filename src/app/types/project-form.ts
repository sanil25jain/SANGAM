import type {
  IndustrySector,
  ProjectStage,
  LandStatus,
} from "./project";

export interface ProjectFormData {
  name: string;

  sector: IndustrySector | "";

  projectStage: ProjectStage | "";

  investmentAmount: string;

  state: string;

  district: string;

  landStatus: LandStatus | "";

  builtUpArea: string;

  employeeCount: string;

  requiresConstruction: boolean;

  requiresElectricity: boolean;

  requiresWater: boolean;

  generatesWaste: boolean;

  usesHazardousMaterials: boolean;

  requiresBoiler: boolean;

  requiresFactoryLicense: boolean;
}