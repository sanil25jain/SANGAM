import type {
  ApprovalPriority,
  ApprovalStatus,
} from "../../types/approval";

export function getStatusLabel(
  status: ApprovalStatus
) {
  const labels: Record<ApprovalStatus, string> = {
    not_started: "Not Started",
    ready: "Ready to Apply",
    submitted: "Submitted",
    under_review: "Under Review",
    query: "Query Raised",
    inspection: "Inspection",
    approved: "Approved",
    rejected: "Rejected",
  };

  return labels[status];
}

export function getStatusClass(
  status: ApprovalStatus
) {
  const classes: Record<ApprovalStatus, string> = {
    not_started:
      "bg-slate-100 text-slate-600",

    ready:
      "bg-blue-50 text-blue-700",

    submitted:
      "bg-indigo-50 text-indigo-700",

    under_review:
      "bg-amber-50 text-amber-700",

    query:
      "bg-red-50 text-red-700",

    inspection:
      "bg-purple-50 text-purple-700",

    approved:
      "bg-emerald-50 text-emerald-700",

    rejected:
      "bg-red-50 text-red-700",
  };

  return classes[status];
}

export function getPriorityLabel(
  priority: ApprovalPriority
) {
  const labels: Record<ApprovalPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };

  return labels[priority];
}