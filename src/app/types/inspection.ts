export type InspectionStatus =
  | "scheduled"
  | "completed"
  | "pending"
  | "cancelled";

export interface Inspection {
  id: string;
  approvalId: string;
  approvalName: string;
  department: string;

  scheduledDate: string;
  scheduledTime: string;

  inspector?: string;
  location: string;

  status: InspectionStatus;

  notes?: string;
}