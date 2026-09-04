import type { Approval } from "../../app/types/approval";

export function getComplianceMetrics(
  approvals: Approval[]
) {
  const active = approvals.filter(
    (approval) =>
      approval.status !== "approved" &&
      approval.status !== "rejected" &&
      approval.status !== "not_started"
  );

  const overdue = active.filter(
    (approval) => approval.daysRemaining < 0
  );

  const dueSoon = active.filter(
    (approval) =>
      approval.daysRemaining >= 0 &&
      approval.daysRemaining <= 3
  );

  const completed = approvals.filter(
    (approval) => approval.status === "approved"
  );

  return {
    active: active.length,
    overdue: overdue.length,
    dueSoon: dueSoon.length,
    completed: completed.length,
  };
}