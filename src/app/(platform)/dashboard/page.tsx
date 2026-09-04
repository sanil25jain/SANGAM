import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Plus,
  ShieldCheck,
} from "lucide-react";

import { mockProjects } from "../../data/mock/projects";
import { mockApprovals } from "../../data/mock/approvals";
import { getApprovalMetrics } from "../../lib/dashboard/dashboard-metrics";

export default function DashboardPage() {
  const project = mockProjects[0];

  const metrics = getApprovalMetrics(mockApprovals);

  const recentApprovals = [...mockApprovals]
    .sort((a, b) => {
      if (a.status === "query") return -1;
      if (b.status === "query") return 1;

      if (a.status === "inspection") return -1;
      if (b.status === "inspection") return 1;

      if (a.status === "under_review") return -1;
      if (b.status === "under_review") return 1;

      return 0;
    })
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Sunday, August 30, 2026
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            Good morning, Sanil.
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening with your projects.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Project Overview */}
      {project && (
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 p-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-slate-950">
                  {project.name}
                </h2>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  In Progress
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {project.industry} · {project.location}
              </p>
            </div>

            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]"
            >
              View Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Approval Metrics */}
          <div className="grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
            <Metric
              label="Total Approvals"
              value={metrics.total.toString()}
              icon={FileCheck2}
            />

            <Metric
              label="Completed"
              value={metrics.completed.toString()}
              icon={CheckCircle2}
            />

            <Metric
              label="In Progress"
              value={metrics.inProgress.toString()}
              icon={Clock3}
            />

            <Metric
              label="Readiness"
              value={`${metrics.progress}%`}
              icon={ShieldCheck}
            />
          </div>

          {/* Approval Progress */}
          <div className="border-t border-slate-100 p-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">
                Approval journey
              </span>

              <span className="font-semibold text-slate-900">
                {metrics.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--primary)] transition-all"
                style={{
                  width: `${metrics.progress}%`,
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Applications"
          value={metrics.total.toString()}
          description={`${metrics.completed} approved`}
        />

        <StatCard
          title="Action Required"
          value={metrics.actionRequired.toString()}
          description={
            metrics.actionRequired > 0
              ? "Need your attention"
              : "Nothing requires attention"
          }
          warning={metrics.actionRequired > 0}
        />

        <StatCard
          title="Ready to Apply"
          value={metrics.ready.toString()}
          description="Can be started"
        />

        <StatCard
          title="In Progress"
          value={metrics.inProgress.toString()}
          description="Currently being processed"
        />
      </div>

      {/* Applications + Upcoming */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-semibold text-slate-950">
                Recent Applications
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest approval activity
              </p>
            </div>

            <Link
              href="/approvals"
              className="text-sm font-medium text-[var(--primary)]"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentApprovals.length > 0 ? (
              recentApprovals.map((approval) => (
                <ApplicationRow
                  key={approval.id}
                  name={approval.name}
                  department={approval.department}
                  status={formatApprovalStatus(approval.status)}
                  statusType={getStatusType(approval.status)}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm font-medium text-slate-900">
                  No applications yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your approval applications will appear here.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-semibold text-slate-950">
              Upcoming
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Important dates
            </p>
          </div>

          <div className="space-y-1 p-3">
            <Upcoming
              date="SEP 05"
              title="Pollution Report"
              type="Compliance"
            />

            <Upcoming
              date="SEP 10"
              title="Labour Return"
              type="Compliance"
            />

            <Upcoming
              date="SEP 15"
              title="GST Filing"
              type="Tax"
            />

            <Upcoming
              date="SEP 20"
              title="Fire Inspection"
              type="Inspection"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatApprovalStatus(
  status:
    | "not_started"
    | "ready"
    | "submitted"
    | "under_review"
    | "query"
    | "inspection"
    | "approved"
    | "rejected"
) {
  const labels = {
    not_started: "Not Started",
    ready: "Ready to Apply",
    submitted: "Submitted",
    under_review: "Under Review",
    query: "Query Raised",
    inspection: "Inspection Scheduled",
    approved: "Approved",
    rejected: "Rejected",
  };

  return labels[status];
}

function getStatusType(
  status:
    | "not_started"
    | "ready"
    | "submitted"
    | "under_review"
    | "query"
    | "inspection"
    | "approved"
    | "rejected"
): "success" | "warning" | "info" | "neutral" {
  switch (status) {
    case "approved":
      return "success";

    case "query":
    case "rejected":
      return "warning";

    case "inspection":
    case "submitted":
    case "under_review":
      return "info";

    case "ready":
    case "not_started":
    default:
      return "neutral";
  }
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="p-5">
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

function StatCard({
  title,
  value,
  description,
  warning = false,
}: {
  title: string;
  value: string;
  description: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-2xl font-semibold ${
          warning
            ? "text-amber-600"
            : "text-slate-950"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

function ApplicationRow({
  name,
  department,
  status,
  statusType,
}: {
  name: string;
  department: string;
  status: string;
  statusType:
    | "success"
    | "warning"
    | "info"
    | "neutral";
}) {
  const styles = {
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    info: "bg-blue-50 text-blue-700",
    neutral: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900">
          {name}
        </p>

        <p className="mt-1 truncate text-xs text-slate-500">
          {department}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${styles[statusType]}`}
      >
        {status}
      </span>
    </div>
  );
}

function Upcoming({
  date,
  title,
  type,
}: {
  date: string;
  title: string;
  type: string;
}) {
  const [month, day] = date.split(" ");

  return (
    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-50">
      <div className="w-12 shrink-0 rounded-md border border-slate-200 bg-slate-50 py-1.5 text-center">
        <p className="text-[9px] font-bold text-slate-400">
          {month}
        </p>

        <p className="text-sm font-semibold text-slate-800">
          {day}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">
          {type}
        </p>
      </div>
    </div>
  );
}