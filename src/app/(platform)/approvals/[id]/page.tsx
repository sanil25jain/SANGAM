import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    FileText,
    GitBranch,
    ShieldCheck,
} from "lucide-react";

import { mockApprovals } from "../../../data/mock/approvals";

interface ApprovalDetailPageProps {
    params: Promise<{
        approvalId: string;
    }>;
}

export default async function ApprovalDetailPage({
    params,
}: ApprovalDetailPageProps) {
    const { approvalId } = await params;

    const approval = mockApprovals.find(
        (item) => item.id === approvalId
    );

    if (!approval) {
        return (
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/approvals"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Approvals
                </Link>

                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-lg font-semibold text-slate-950">
                        Approval not found
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        The requested approval does not exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            {/* Back */}
            <Link
                href="/approvals"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Approvals
            </Link>

            {/* Header */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                                {approval.name}
                            </h1>

                            <StatusBadge status={approval.status} />

                            <PriorityBadge priority={approval.priority} />
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                            {approval.department}
                        </p>

                        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                            {approval.description}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <button className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90">
                            {getActionLabel(approval.status)}
                        </button>
                    </div>
                </div>
            </section>

            {/* Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Metric
                    icon={ShieldCheck}
                    label="Status"
                    value={formatStatus(approval.status)}
                />

                <Metric
                    icon={Clock3}
                    label="Estimated Time"
                    value={`${approval.estimatedDays} days`}
                />

                <Metric
                    icon={Clock3}
                    label="SLA"
                    value={`${approval.slaDays} days`}
                />

                <Metric
                    icon={CheckCircle2}
                    label="Progress"
                    value={`${approval.progress}%`}
                />
            </div>

            {/* Main content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Progress */}
                    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-5">
                            <h2 className="font-semibold text-slate-950">
                                Approval Progress
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Current progress through the approval workflow
                            </p>
                        </div>

                        <div className="p-5">
                            <div className="mb-2 flex items-center justify-between text-xs">
                                <span className="font-medium text-slate-600">
                                    Completion
                                </span>

                                <span className="font-semibold text-slate-900">
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

                            <p className="mt-3 text-xs text-slate-500">
                                Last updated {approval.lastUpdated}
                            </p>
                        </div>
                    </section>

                    {/* Dependency Graph */}
                    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-5">
                            <div className="flex items-center gap-2">
                                <GitBranch className="h-4 w-4 text-slate-400" />

                                <h2 className="font-semibold text-slate-950">
                                    Workflow Dependencies
                                </h2>
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                                Approvals that must be completed before this approval
                                can proceed.
                            </p>
                        </div>

                        <div className="p-5">
                            {approval.dependencies.length === 0 ? (
                                <div className="rounded-lg bg-emerald-50 p-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                                        <p className="text-sm font-medium text-emerald-800">
                                            No dependencies
                                        </p>
                                    </div>

                                    <p className="mt-1 text-xs text-emerald-700">
                                        This approval can be started independently.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {approval.dependencies.map((dependencyId) => {
                                        const dependency = mockApprovals.find(
                                            (item) => item.id === dependencyId
                                        );

                                        return (
                                            <Link
                                                key={dependencyId}
                                                href={`/approvals/${dependencyId}`}
                                                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">
                                                        {dependency?.name ?? dependencyId}
                                                    </p>

                                                    {dependency && (
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {formatStatus(dependency.status)}
                                                        </p>
                                                    )}
                                                </div>

                                                <ArrowLeft className="h-4 w-4 rotate-180 text-slate-300" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Documents */}
                    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-5">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-400" />

                                <h2 className="font-semibold text-slate-950">
                                    Required Documents
                                </h2>
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                                Documents required for this approval.
                            </p>
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
                                        className="flex items-center justify-between gap-4 p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            {submitted ? (
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            ) : (
                                                <FileText className="h-4 w-4 text-slate-400" />
                                            )}

                                            <span className="text-sm text-slate-700">
                                                {document}
                                            </span>
                                        </div>

                                        <span
                                            className={`text-xs font-medium ${submitted
                                                    ? "text-emerald-600"
                                                    : "text-slate-400"
                                                }`}
                                        >
                                            {submitted ? "Submitted" : "Required"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Right */}
                <div className="space-y-6">
                    {/* SLA */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="font-semibold text-slate-950">
                            SLA Tracking
                        </h2>

                        <div className="mt-5">
                            <p className="text-xs text-slate-400">
                                Estimated processing time
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-slate-950">
                                {approval.estimatedDays} days
                            </p>
                        </div>

                        <div className="mt-5">
                            <p className="text-xs text-slate-400">
                                Statutory / service SLA
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-900">
                                {approval.slaDays} days
                            </p>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-xs text-slate-400">
                                Days remaining
                            </p>

                            <p
                                className={`mt-1 text-lg font-semibold ${approval.daysRemaining <= 2
                                        ? "text-amber-600"
                                        : "text-slate-900"
                                    }`}
                            >
                                {approval.daysRemaining}
                            </p>
                        </div>
                    </section>

                    {/* Status */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="font-semibold text-slate-950">
                            Current Status
                        </h2>

                        <div className="mt-4">
                            <StatusBadge status={approval.status} />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            {getStatusDescription(approval.status)}
                        </p>
                    </section>

                    {/* Priority */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="font-semibold text-slate-950">
                            Priority
                        </h2>

                        <div className="mt-3">
                            <PriorityBadge priority={approval.priority} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatStatus(
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
        inspection: "Inspection",
        approved: "Approved",
        rejected: "Rejected",
    };

    return labels[status];
}

function getActionLabel(
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
        not_started: "View Requirements",
        ready: "Start Application",
        submitted: "View Application",
        under_review: "View Application",
        query: "Respond to Query",
        inspection: "View Inspection",
        approved: "View Certificate",
        rejected: "Review & Reapply",
    };

    return labels[status];
}

function getStatusDescription(
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
    const descriptions = {
        not_started:
            "This approval has not yet been started.",
        ready:
            "All known prerequisites are satisfied and this approval is ready to be initiated.",
        submitted:
            "The application has been submitted to the relevant authority.",
        under_review:
            "The application is currently being reviewed by the department.",
        query:
            "The department has raised a query that requires applicant action.",
        inspection:
            "An inspection is required or has been scheduled as part of the approval process.",
        approved:
            "This approval has been successfully granted.",
        rejected:
            "The application has been rejected and requires review or corrective action.",
    };

    return descriptions[status];
}

function StatusBadge({
    status,
}: {
    status:
    | "not_started"
    | "ready"
    | "submitted"
    | "under_review"
    | "query"
    | "inspection"
    | "approved"
    | "rejected";
}) {
    const styles = {
        not_started: "bg-slate-100 text-slate-600",
        ready: "bg-blue-50 text-blue-700",
        submitted: "bg-blue-50 text-blue-700",
        under_review: "bg-amber-50 text-amber-700",
        query: "bg-orange-50 text-orange-700",
        inspection: "bg-purple-50 text-purple-700",
        approved: "bg-emerald-50 text-emerald-700",
        rejected: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
        >
            {formatStatus(status)}
        </span>
    );
}

function PriorityBadge({
    priority,
}: {
    priority:
    | "low"
    | "medium"
    | "high"
    | "critical";
}) {
    const styles = {
        low: "text-slate-400",
        medium: "text-slate-500",
        high: "text-amber-600",
        critical: "text-red-600",
    };

    return (
        <span
            className={`text-[10px] font-semibold uppercase ${styles[priority]}`}
        >
            {priority} priority
        </span>
    );
}

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

            <p className="mt-2 text-lg font-semibold text-slate-950">
                {value}
            </p>
        </div>
    );
}