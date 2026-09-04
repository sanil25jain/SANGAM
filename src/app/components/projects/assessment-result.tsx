import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  GitBranch,
} from "lucide-react";

import type { ApprovalAssessment } from "../../types/assessment";

interface AssessmentResultProps {
  assessments: ApprovalAssessment[];
}

export function AssessmentResult({
  assessments,
}: AssessmentResultProps) {
  const required = assessments.filter(
    (item) => item.applicability === "required"
  );

  const conditional = assessments.filter(
    (item) => item.applicability === "conditional"
  );

  const parallel = assessments.filter(
    (item) => item.approval.dependencies.length === 0
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          SANGAM Intelligence
        </p>

        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          Your approval roadmap is ready
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          We've analyzed your project profile and identified
          potentially applicable approvals.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={CheckCircle2}
          label="Required"
          value={required.length}
        />

        <SummaryCard
          icon={AlertCircle}
          label="Conditional"
          value={conditional.length}
        />

        <SummaryCard
          icon={GitBranch}
          label="Can Start Immediately"
          value={parallel.length}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-semibold text-slate-950">
            Recommended Approvals
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {assessments.map((item) => (
            <div
              key={item.approval.id}
              className="p-5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-slate-900">
                      {item.approval.name}
                    </h4>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        item.applicability === "required"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.applicability === "conditional"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.applicability}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.approval.department}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" />
                  {item.approval.estimatedDays} days
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.reason}
              </p>

              {item.approval.dependencies.length > 0 && (
                <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  Depends on:{" "}
                  <span className="font-medium text-slate-700">
                    {item.approval.dependencies.join(", ")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      <Icon className="h-5 w-5 text-slate-400" />

      <p className="mt-3 text-2xl font-semibold text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}