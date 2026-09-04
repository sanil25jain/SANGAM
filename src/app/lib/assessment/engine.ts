import type { ApprovalAssessment } from "../../types/approval";
import type { ProjectProfile } from "../../types/assessment";

import { approvalRules } from "./rules";

export function assessProject(
  project: ProjectProfile
): ApprovalAssessment[] {
  return approvalRules
    .filter((rule) => rule.evaluate(project))
    .map((rule) => ({
      approval: rule.createApproval(project),

      applicability:
        rule.applicability(project),

      reason:
        rule.reason(project),
    }));
}