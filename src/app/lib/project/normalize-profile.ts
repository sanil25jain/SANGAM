import type { ProjectProfile } from "../../types/project";
import type { ProjectFormData } from "../../types/project-form";

export function normalizeProjectProfile(
  form: ProjectFormData
): ProjectProfile {
  if (!form.sector) {
    throw new Error("Sector is required.");
  }

  if (!form.projectStage) {
    throw new Error("Project stage is required.");
  }

  if (!form.landStatus) {
    throw new Error("Land status is required.");
  }

  return {
    name: form.name.trim(),

    sector: form.sector,

    projectStage: form.projectStage,

    investmentAmount: Number(form.investmentAmount),

    state: form.state.trim(),

    district: form.district.trim(),

    landStatus: form.landStatus,

    builtUpArea: Number(form.builtUpArea),

    employeeCount: Number(form.employeeCount),

    requiresConstruction:
      form.requiresConstruction,

    requiresElectricity:
      form.requiresElectricity,

    requiresWater:
      form.requiresWater,

    generatesWaste:
      form.generatesWaste,

    usesHazardousMaterials:
      form.usesHazardousMaterials,

    requiresBoiler:
      form.requiresBoiler,

    requiresFactoryLicense:
      form.requiresFactoryLicense,
  };
}