import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

import { mockApprovals } from "../../../../data/mock/approvals";

interface ApprovalPageProps {
  params: {
    projectId: string;
    approvalId: string;
  };
}

export default function ApprovalPage({
  params,
}: ApprovalPageProps) {
  const approval = mockApprovals.find(
    (item) => item.id === params.approvalId
  );

  if (!approval) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center">
        <h1 className="text-xl font-semibold text-slate-950">
          Approval not found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          The requested approval does not exist.
        </p>

        <Link
          href={`/projects/${params.projectId}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Project
        </Link>
      </div>
    );
  }

  const completedDocuments = approval.submittedDocuments.length;
  const totalDocuments = approval.documents.length;

  const documentProgress =
    totalDocuments === 0
      ? 0
      : Math.round(
          (completedDocuments / totalDocuments) * 100
        );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Back */}
      <Link
        href={`/projects/${params.projectId}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Project
      </Link>

      {/* Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                {approval.name}
              </h1>

              <StatusBadge status={approval.status} />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {approval.department}
            </p>
          </div>

          <PriorityBadge priority={approval.priority} />
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">
          {approval.description}
        </p>
      </section>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          icon={Clock3}
          label="Estimated Processing"
          value={`${approval.estimatedDays} days`}
        />

        <Metric
          icon={ShieldCheck}
          label="SLA"
          value={`${approval.slaDays} days`}
        />

        <Metric
          icon={FileCheck2}
          label="Progress"
          value={`${approval.progress}%`}
        />

        <Metric
          icon={CheckCircle2}
          label="Documents"
          value={`${completedDocuments}/${totalDocuments}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Documents */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    Required Documents
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Documents required for this approval.
                  </p>
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {documentProgress}%
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[var(--primary)]"
                  style={{
                    width: `${documentProgress}%`,
                  }}
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {approval.documents.map((document) => {
                const submitted =
                  approval.submittedDocuments.includes(
                    document
                  );

                return (
                  <div
                    key={document}
                    className="flex items-center justify-between gap-4 p-5"
                  >
                    <div className="flex items-center gap-3">
                      {submitted ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                      )}

                      <span className="text-sm font-medium text-slate-800">
                        {document}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-medium ${
                        submitted
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      {submitted ? "Submitted" : "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Dependencies */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-slate-400" />

                <h2 className="font-semibold text-slate-950">
                  Dependencies
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Approvals that must be completed before this
                approval can proceed.
              </p>
            </div>

            {approval.dependencies.length === 0 ? (
              <div className="p-5 text-sm text-emerald-700">
                This approval has no dependencies and can
                proceed independently.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {approval.dependencies.map((dependency) => (
                  <div
                    key={dependency}
                    className="flex items-center gap-3 p-5"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                    <span className="text-sm font-medium text-slate-800">
                      {getApprovalName(dependency)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">
              Approval Status
            </h2>

            <div className="mt-5">
              <StatusBadge status={approval.status} />
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Last updated {approval.lastUpdated}
            </p>
          </section>

          {/* SLA */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">
              SLA Timeline
            </h2>

            <div className="mt-5">
              <div className="flex items-end justify-between">
                <span className="text-sm text-slate-500">
                  Days remaining
                </span>

                <span className="text-xl font-semibold text-slate-950">
                  {approval.daysRemaining}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[var(--primary)]"
                  style={{
                    width: `${Math.min(
                      approval.progress,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                SLA: {approval.slaDays} days
              </p>
            </div>
          </section>

          {/* Action */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">
              Actions
            </h2>

            <button className="mt-4 w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
              {approval.status === "ready"
                ? "Start Application"
                : approval.status === "query"
                  ? "Respond to Query"
                  : "View Application"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    not_started: "bg-slate-100 text-slate-600",
    ready: "bg-blue-50 text-blue-700",
    submitted: "bg-indigo-50 text-indigo-700",
    under_review: "bg-amber-50 text-amber-700",
    query: "bg-orange-50 text-orange-700",
    inspection: "bg-purple-50 text-purple-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  const labels: Record<string, string> = {
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
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ?? styles.not_started
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const styles: Record<string, string> = {
    low: "bg-slate-100 text-slate-600",
    medium: "bg-blue-50 text-blue-700",
    high: "bg-amber-50 text-amber-700",
    critical: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${
        styles[priority] ?? styles.medium
      }`}
    >
      {priority}
    </span>
  );
}

function getApprovalName(id: string) {
  return (
    mockApprovals.find(
      (approval) => approval.id === id
    )?.name ?? id
  );
}