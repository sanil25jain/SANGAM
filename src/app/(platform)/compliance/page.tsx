import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { mockApprovals } from "../../data/mock/approvals";
import { getComplianceMetrics } from "../../lib/compliance/compliance-utils";

export default function CompliancePage() {
  const metrics = getComplianceMetrics(mockApprovals);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          Compliance Management
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          SLA & Compliance
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor approval deadlines, SLA risk and compliance actions.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={ShieldCheck}
          label="Active Approvals"
          value={metrics.active}
        />

        <SummaryCard
          icon={AlertTriangle}
          label="Due Soon"
          value={metrics.dueSoon}
          warning={metrics.dueSoon > 0}
        />

        <SummaryCard
          icon={Clock3}
          label="Overdue"
          value={metrics.overdue}
          danger={metrics.overdue > 0}
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Completed"
          value={metrics.completed}
        />
      </div>

      {/* SLA table */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-950">
            Approval SLA Monitor
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Track the current status and remaining SLA time for each approval.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {mockApprovals.map((approval) => (
            <div
              key={approval.id}
              className="p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Approval */}
                <div className="min-w-0 lg:w-1/3">
                  <p className="font-medium text-slate-950">
                    {approval.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {approval.department}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <StatusBadge status={approval.status} />
                </div>

                {/* SLA */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    SLA
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {approval.slaDays} days
                  </p>
                </div>

                {/* Remaining */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Remaining
                  </p>

                  <RemainingDays
                    days={approval.daysRemaining}
                    status={approval.status}
                  />
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Progress
                  </span>

                  <span className="font-medium text-slate-700">
                    {approval.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all"
                    style={{
                      width: `${Math.min(
                        Math.max(approval.progress, 0),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {mockApprovals.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500">
              No approvals available.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  warning = false,
  danger = false,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  warning?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon
        className={`h-5 w-5 ${
          danger
            ? "text-red-500"
            : warning
              ? "text-amber-500"
              : "text-slate-400"
        }`}
      />

      <p className="mt-3 text-2xl font-semibold text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

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
    submitted: "bg-indigo-50 text-indigo-700",
    under_review: "bg-amber-50 text-amber-700",
    query: "bg-orange-50 text-orange-700",
    inspection: "bg-purple-50 text-purple-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  const label = status.replaceAll("_", " ");

  return (
    <span
      className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
        styles[status]
      }`}
    >
      {label}
    </span>
  );
}

function RemainingDays({
  days,
  status,
}: {
  days: number;
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
  if (status === "approved") {
    return (
      <p className="mt-1 text-sm font-medium text-emerald-600">
        Completed
      </p>
    );
  }

  if (days < 0) {
    return (
      <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-red-600">
        <AlertTriangle className="h-3.5 w-3.5" />
        {Math.abs(days)} days overdue
      </p>
    );
  }

  if (days <= 3) {
    return (
      <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-amber-600">
        <Clock3 className="h-3.5 w-3.5" />
        {days} days left
      </p>
    );
  }

  return (
    <p className="mt-1 text-sm font-medium text-slate-700">
      {days} days left
    </p>
  );
}