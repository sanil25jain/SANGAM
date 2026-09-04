import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import { mockInspections } from "../../data/mock/inspections";

export default function InspectionsPage() {
  const scheduled = mockInspections.filter(
    (inspection) => inspection.status === "scheduled"
  );

  const pending = mockInspections.filter(
    (inspection) => inspection.status === "pending"
  );

  const completed = mockInspections.filter(
    (inspection) => inspection.status === "completed"
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          Compliance Management
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          Inspections
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track scheduled, pending and completed government inspections.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={CalendarCheck}
          label="Scheduled"
          value={scheduled.length}
        />

        <SummaryCard
          icon={Clock3}
          label="Pending"
          value={pending.length}
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Completed"
          value={completed.length}
        />
      </div>

      {/* Inspection list */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-950">
            Inspection Schedule
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Government inspections associated with your approvals.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {mockInspections.map((inspection) => (
            <div
              key={inspection.id}
              className="p-5 transition hover:bg-slate-50"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                {/* Main information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-slate-950">
                      {inspection.approvalName}
                    </h3>

                    <StatusBadge status={inspection.status} />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {inspection.department}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarCheck className="h-3.5 w-3.5" />
                      {formatDate(inspection.scheduledDate)}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {inspection.scheduledTime}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {inspection.location}
                    </span>
                  </div>
                </div>

                {/* Inspector */}
                <div className="shrink-0 md:text-right">
                  <p className="text-xs text-slate-400">
                    Inspector
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {inspection.inspector || "Not assigned"}
                  </p>
                </div>
              </div>

              {inspection.notes && (
                <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">
                  <p className="text-xs leading-5 text-slate-600">
                    {inspection.notes}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <Link
                  href={`/approvals/${inspection.approvalId}`}
                  className="text-xs font-medium text-[var(--primary)] hover:underline"
                >
                  View related approval →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
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

function StatusBadge({
  status,
}: {
  status: "scheduled" | "completed" | "pending" | "cancelled";
}) {
  const styles = {
    scheduled: "bg-blue-50 text-blue-700",
    completed: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    cancelled: "bg-red-50 text-red-700",
  };

  const labels = {
    scheduled: "Scheduled",
    completed: "Completed",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}