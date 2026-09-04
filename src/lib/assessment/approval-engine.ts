import type { Approval } from "../../app/types/approval";
import type { ProjectProfile } from "../../app/types/project";
import type { ApprovalAssessment } from "../../app/types/assessment";

import { mockApprovals } from "../../app/data/mock/approvals";

export function assessProject(
  project: ProjectProfile
): ApprovalAssessment[] {
  return mockApprovals.map((approval) => {
    let applicability: ApprovalAssessment["applicability"] =
      "required";

    let reason =
      "Applicable based on the project profile.";

    /*
     * Electricity
     */
    if (
      approval.id === "electricity" &&
      !project.requiresElectricity
    ) {
      applicability = "not_required";

      reason =
        "The project does not require an industrial electricity connection.";
    }

    /*
     * Water
     */
    if (
      approval.id === "water" &&
      !project.requiresWater
    ) {
      applicability = "not_required";

      reason =
        "The project does not require an industrial water connection.";
    }

    /*
     * Factory License
     */
    if (
      approval.id === "factory-license" &&
      !project.requiresFactoryLicense
    ) {
      applicability = "not_required";

      reason =
        "Factory licensing has not been indicated as required for this project.";
    }

    /*
     * Building Approval
     */
    if (
      approval.id === "building-approval" &&
      !project.requiresConstruction
    ) {
      applicability = "not_required";

      reason =
        "Construction has not been indicated for this project.";
    }

    /*
     * Pollution Consent
     */
    if (
      approval.id === "pollution-consent" &&
      !project.generatesWaste
    ) {
      applicability = "conditional";

      reason =
        "Environmental requirements depend on the nature and quantity of waste generated.";
    }

    /*
     * Hazardous materials
     */
    if (
      approval.id === "hazardous-materials" &&
      !project.usesHazardousMaterials
    ) {
      applicability = "not_required";

      reason =
        "The project does not indicate the use of hazardous materials.";
    }

    /*
     * Boiler
     */
    if (
      approval.id === "boiler" &&
      !project.requiresBoiler
    ) {
      applicability = "not_required";

      reason =
        "Boiler-related approval is not required based on the project profile.";
    }

    return {
      approval,
      applicability,
      reason,
      confidence: 1,
    };
  });
}