import type { Approval } from "../../app/types/approval";

export interface ApprovalMetrics {
  total: number;
  completed: number;
  actionRequired: number;
  inProgress: number;
  ready: number;
  progress: number;
}

export function getApprovalMetrics(
  approvals: Approval[]
): ApprovalMetrics {
  const total = approvals.length;

  const completed = approvals.filter(
    (approval) => approval.status === "approved"
  ).length;

  const actionRequired = approvals.filter(
    (approval) =>
      approval.status === "query" ||
      approval.status === "rejected"
  ).length;

  const inProgress = approvals.filter(
    (approval) =>
      approval.status === "submitted" ||
      approval.status === "under_review" ||
      approval.status === "inspection"
  ).length;

  const ready = approvals.filter(
    (approval) => approval.status === "ready"
  ).length;

  const progress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    actionRequired,
    inProgress,
    ready,
    progress,
  };
}