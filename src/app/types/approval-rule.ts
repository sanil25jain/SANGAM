import type { Approval } from "./approval";
import type { ProjectProfile } from "./assessment";

export interface ApprovalRule {
  id: string;

  name: string;

  description: string;

  evaluate: (
    project: ProjectProfile
  ) => boolean;

  applicability: (
    project: ProjectProfile
  ) => "required" | "conditional";

  reason: (
    project: ProjectProfile
  ) => string;

  createApproval: (
    project: ProjectProfile
  ) => Approval;
}