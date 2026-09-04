import { buildWorkflowGraph, analyzeWorkflow } from "../../../lib/workflow/engine";

import { mockApprovals } from "../../data/mock/approvals";

import { DependencyGraph } from "../../components/workflow/dependency-graph";
import { WorkflowSummary } from "../../components/workflow/workflow-summary";
import { BlockersPanel } from "../../components/workflow/blockers-panel";

export default function WorkflowPage() {
  const graph = buildWorkflowGraph(
    mockApprovals
  );

  const analysis = analyzeWorkflow(
    mockApprovals
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}

      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          SANGAM Intelligence
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          Approval Workflow
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Understand approval dependencies, identify
          bottlenecks and see which applications can
          proceed in parallel.
        </p>
      </div>

      {/* Summary */}

      <WorkflowSummary
        analysis={analysis}
      />

      {/* Critical Path */}

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <div>
            <h2 className="font-semibold text-slate-950">
              Critical Path
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              The dependency chain most likely to determine
              overall approval completion.
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-900">
            {graph.estimatedCompletionDays} days estimated
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {analysis.criticalPath.map(
            (approval, index) => (
              <div
                key={approval.id}
                className="flex items-center gap-2"
              >
                <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                  {approval.name}
                </span>

                {index <
                  analysis.criticalPath.length - 1 && (
                  <span className="text-slate-300">
                    →
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* Graph */}

      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-slate-950">
            Dependency Map
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Drag nodes to explore how approvals depend on
            each other.
          </p>
        </div>

        <DependencyGraph
          graph={graph}
        />
      </section>

      {/* Blockers */}

      <BlockersPanel
        blocked={analysis.blocked}
      />
    </div>
  );
}