export type ApprovalStatus =
  | "not_started"
  | "ready"
  | "submitted"
  | "under_review"
  | "query"
  | "inspection"
  | "approved"
  | "rejected";

export type ApprovalPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface Approval {
  id: string;
  name: string;
  department: string;

  status: ApprovalStatus;
  priority: ApprovalPriority;

  estimatedDays: number;
  slaDays: number;
  daysRemaining: number;

  progress: number;

  description: string;

  documents: string[];
  submittedDocuments: string[];

  dependencies: string[];

  lastUpdated: string;

  conditional?: boolean;
}

/* Assessment-specific types */

export type ApprovalApplicability =
  | "required"
  | "conditional";

export interface ApprovalAssessment {
  approval: Approval;

  applicability: ApprovalApplicability;

  reason: string;
}
