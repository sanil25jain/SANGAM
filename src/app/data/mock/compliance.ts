export type ComplianceStatus =
  | "upcoming"
  | "due_soon"
  | "overdue"
  | "completed";

export interface ComplianceItem {
  id: string;
  name: string;
  department: string;
  dueDate: string;
  frequency: "monthly" | "quarterly" | "annual";
  status: ComplianceStatus;
  relatedApprovalId?: string;
  description: string;
}