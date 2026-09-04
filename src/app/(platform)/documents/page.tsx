import {
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock3,
} from "lucide-react";

import { mockDocuments } from "../../data/mock/documents";
import { validateDocument } from "../../lib/documents/document-validator";

export default function DocumentsPage() {
  const verified = mockDocuments.filter(
    (doc) => doc.status === "verified"
  ).length;

  const pending = mockDocuments.filter(
    (doc) => doc.status === "uploaded"
  ).length;

  const rejected = mockDocuments.filter(
    (doc) => doc.status === "rejected"
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          Document Management
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          Documents
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload once, verify once, and reuse documents across
          applicable approvals.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Summary
          icon={CheckCircle2}
          label="Verified"
          value={verified}
        />

        <Summary
          icon={Clock3}
          label="Pending Verification"
          value={pending}
        />

        <Summary
          icon={AlertCircle}
          label="Rejected"
          value={rejected}
        />
      </div>

      {/* Documents */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-950">
            Document Vault
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Your project documents and verification status.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {mockDocuments.map((document) => {
            const validation =
              validateDocument(document);

            return (
              <DocumentRow
                key={document.id}
                document={document}
                validation={validation}
              />
            );
          })}
        </div>
      </section>
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

function DocumentRow({
  document,
  validation,
}: {
  document: (typeof mockDocuments)[number];
  validation: {
    valid: boolean;
    errors: string[];
    warnings: string[];
  };
}) {
  const statusStyles = {
    verified: "bg-emerald-50 text-emerald-700",
    uploaded: "bg-amber-50 text-amber-700",
    rejected: "bg-red-50 text-red-700",
    missing: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="rounded-lg bg-slate-50 p-2.5">
          <FileText className="h-5 w-5 text-slate-500" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900">
            {document.name}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">
            {document.fileName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!validation.valid && (
          <span className="text-xs text-red-600">
            {validation.errors[0]}
          </span>
        )}

        {validation.valid &&
          validation.warnings.length > 0 && (
            <span className="text-xs text-amber-600">
              {validation.warnings[0]}
            </span>
          )}

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[document.status]}`}
        >
          {document.status.replace("_", " ")}
        </span>
      </div>
    </div>
  );
}