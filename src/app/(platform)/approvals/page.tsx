import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  AlertCircle,
} from "lucide-react";

import { mockApprovals } from "../../data/mock/approvals";

export default function ApprovalsPage() {
  const approvals = mockApprovals;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          Approval Management
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          Approvals
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track, manage and monitor your project approvals.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={FileCheck2}
          label="Total"
          value={approvals.length}
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Approved"
          value={
            approvals.filter(
              (approval) => approval.status === "approved"
            ).length
          }
        />

        <SummaryCard
          icon={Clock3}
          label="In Progress"
          value={
            approvals.filter(
              (approval) =>
                approval.status === "submitted" ||
                approval.status === "under_review" ||
                approval.status === "inspection"
            ).length
          }
        />

        <SummaryCard
          icon={AlertCircle}
          label="Action Required"
          value={
            approvals.filter(
              (approval) =>
                approval.status === "query" ||
                approval.status === "rejected"
            ).length
          }
        />
      </div>

      {/* Approval List */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-950">
            All Approvals
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Approval requirements and current workflow status
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {approvals.map((approval) => (
            <Link
              key={approval.id}
              href={`/approvals/${approval.id}`}
              className="group block p-5 transition hover:bg-slate-50"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                {/* Approval information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-slate-900">
                      {approval.name}
                    </h3>

                    <StatusBadge status={approval.status} />

                    <PriorityBadge
                      priority={approval.priority}
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {approval.department}
                  </p>

                  <p className="mt-2 max-w-2xl text-sm text-slate-600">
                    {approval.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="flex shrink-0 items-center gap-6">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Estimated
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {approval.estimatedDays} days
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      SLA
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {approval.slaDays} days
                    </p>
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600" />
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Progress
                  </span>

                  <span className="font-medium text-slate-600">
                    {approval.progress}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all"
                    style={{
                      width: `${approval.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Dependencies */}
              {approval.dependencies.length > 0 && (
                <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    Depends on:
                  </span>{" "}
                  {approval.dependencies.join(", ")}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Summary Card                                                               */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="mt-2 text-2xl font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status:
    | "not_started"
    | "ready"
    | "submitted"
    | "under_review"
    | "query"
    | "inspection"
    | "approved"
    | "rejected";
}) {
  const styles = {
    not_started: "bg-slate-100 text-slate-600",
    ready: "bg-blue-50 text-blue-700",
    submitted: "bg-blue-50 text-blue-700",
    under_review: "bg-amber-50 text-amber-700",
    query: "bg-orange-50 text-orange-700",
    inspection: "bg-purple-50 text-purple-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  const labels = {
    not_started: "Not Started",
    ready: "Ready to Apply",
    submitted: "Submitted",
    under_review: "Under Review",
    query: "Query Raised",
    inspection: "Inspection",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Priority Badge                                                             */
/* -------------------------------------------------------------------------- */

function PriorityBadge({
  priority,
}: {
  priority:
    | "low"
    | "medium"
    | "high"
    | "critical";
}) {
  const styles = {
    low: "text-slate-400",
    medium: "text-slate-500",
    high: "text-amber-600",
    critical: "text-red-600",
  };

  return (
    <span
      className={`text-[10px] font-semibold uppercase ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}