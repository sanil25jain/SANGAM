import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Lock,
} from "lucide-react";

import type { Approval } from "../../types/approval";

import {
  getStatusClass,
  getStatusLabel,
  getPriorityLabel,
} from "../../../lib/approvals/status";

interface ApprovalCardProps {
  approval: Approval;
}

export function ApprovalCard({
  approval,
}: ApprovalCardProps) {
  const documentProgress =
    approval.documents.length === 0
      ? 100
      : Math.round(
          (approval.submittedDocuments.length /
            approval.documents.length) *
            100
        );

  const blocked =
    approval.dependencies.length > 0 &&
    approval.status === "not_started";

  return (
    <Link
      href={`/approvals/${approval.id}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-950">
              {approval.name}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClass(
                approval.status
              )}`}
            >
              {getStatusLabel(approval.status)}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {approval.department}
          </p>
        </div>

        <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700" />
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            Application progress
          </span>

          <span className="text-xs font-semibold text-slate-800">
            {approval.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[var(--primary)]"
            style={{
              width: `${approval.progress}%`,
            }}
          />
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Meta
          icon={Clock3}
          label="SLA"
          value={
            approval.daysRemaining > 0
              ? `${approval.daysRemaining} days remaining`
              : "SLA exceeded"
          }
        />

        <Meta
          icon={FileText}
          label="Documents"
          value={`${approval.submittedDocuments.length}/${approval.documents.length}`}
        />

        <Meta
          icon={approval.status === "approved" ? CheckCircle2 : Lock}
          label={
            approval.dependencies.length > 0
              ? "Dependency"
              : "Priority"
          }
          value={
            approval.dependencies.length > 0
              ? approval.dependencies.join(", ")
              : getPriorityLabel(approval.priority)
          }
        />
      </div>

      {/* Warning */}
      {blocked && (
        <div className="mt-4 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          This approval is waiting for another approval to complete.
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          Updated {approval.lastUpdated}
        </span>

        <span className="text-xs font-medium text-[var(--primary)]">
          View details
        </span>
      </div>
    </Link>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Icon className="h-3.5 w-3.5" />

        <span className="text-[10px] font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-xs font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}