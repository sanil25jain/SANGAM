"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  Landmark,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-slate-50">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[15%] top-[-250px] h-[500px] w-[500px] rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="absolute right-[-150px] top-[15%] h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute bottom-[-250px] left-[20%] h-[450px] w-[450px] rounded-full bg-slate-200/50 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] shadow-lg shadow-slate-900/10">
            <Landmark
              className="h-6 w-6 text-white"
              strokeWidth={2}
            />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-slate-950">
              SANGAM
            </p>

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              GovTech Platform
            </p>
          </div>
        </Link>

        {/* Sign in */}
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
        >
          Sign in
        </Link>
      </nav>

      {/* Main Hero */}
      <section className="mx-auto flex h-[calc(100vh-5rem)] max-w-7xl items-center px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />

              Intelligent Industrial Approvals
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
              One Window.
              <br />

              <span className="text-[var(--primary)]">
                Every Approval.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              SANGAM brings industrial approvals, compliance,
              inspections, renewals, and government support schemes
              together into one intelligent platform.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-3 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Start Your Project

                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                Sign in
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />

              Built for entrepreneurs and industrial units
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={Building2}
              title="Start Your Project"
              description="Create your industrial project profile and identify the approvals you need."
            />

            <FeatureCard
              icon={FileCheck2}
              title="Manage Approvals"
              description="Track applications, documents, deadlines and approval progress."
            />

            <FeatureCard
              icon={ShieldCheck}
              title="Stay Compliant"
              description="Monitor compliance requirements, inspections and renewals."
            />

            <div className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    SANGAM
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    Every step in one place
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full w-[72%] rounded-full bg-[var(--primary)]"
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                From project creation to compliance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 transition group-hover:bg-slate-100">
        <Icon
          className="h-5 w-5 text-[var(--primary)]"
          strokeWidth={2}
        />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}