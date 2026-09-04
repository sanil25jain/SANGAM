import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  GitBranch,
} from "lucide-react";

import type { WorkflowAnalysis } from "../../types/workflow";

interface WorkflowSummaryProps {
  analysis: WorkflowAnalysis;
}

export function WorkflowSummary({
  analysis,
}: WorkflowSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Summary
        icon={Clock3}
        label="Can Start Now"
        value={analysis.ready.length}
      />

      <Summary
        icon={AlertTriangle}
        label="Blocked"
        value={analysis.blocked.length}
      />

      <Summary
        icon={CheckCircle2}
        label="Completed"
        value={analysis.completed.length}
      />

      <Summary
        icon={GitBranch}
        label="Bottlenecks"
        value={analysis.bottlenecks.length}
      />
    </div>
  );
}

function Summary({
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