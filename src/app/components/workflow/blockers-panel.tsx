import { AlertTriangle, ArrowRight } from "lucide-react";

import type { Approval } from "../../types/approval";

interface BlockersPanelProps {
  blocked: Approval[];
}

export function BlockersPanel({
  blocked,
}: BlockersPanelProps) {
  if (blocked.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="font-semibold text-emerald-900">
          No blocked approvals
        </p>

        <p className="mt-1 text-sm text-emerald-700">
          All currently eligible approvals can proceed.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />

          <h2 className="font-semibold text-slate-950">
            What's blocking the project?
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          These approvals cannot proceed until their
          dependencies are completed.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {blocked.map((approval) => (
          <div
            key={approval.id}
            className="flex items-center justify-between gap-4 p-5"
          >
            <div>
              <p className="font-medium text-slate-900">
                {approval.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {approval.department}
              </p>
            </div>

            <ArrowRight className="h-4 w-4 text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}