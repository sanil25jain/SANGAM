import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { mockProjects } from "../../data/mock/projects";
import { mockApprovals } from "../../data/mock/approvals";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Project Management
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            My Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your industrial projects and approval journeys.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Projects */}
      <div className="grid gap-5 lg:grid-cols-2">
        {mockProjects.map((project) => {
          /*
           * Temporary:
           * Until approvals are persisted per project,
           * use the approval catalogue as the source of metrics.
           */
          const approvalCount = mockApprovals.length;

          const completedApprovals = mockApprovals.filter(
            (approval) => approval.status === "approved"
          ).length;

          const progress =
            approvalCount === 0
              ? 0
              : Math.round((completedApprovals / approvalCount) * 100);

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              {/* Project header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    {project.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {project.industry} · {project.location}
                  </p>
                </div>

                <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600" />
              </div>

              {/* Project metrics */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <Info label="Approvals" value={approvalCount.toString()} />

                <Info
                  label="Completed"
                  value={completedApprovals.toString()}
                />

                <Info label="Progress" value={`${progress}%`} />
              </div>

              {/* Progress bar */}
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[var(--primary)] transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>

      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}