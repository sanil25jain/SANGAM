"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Landmark,
  MapPin,
  Target,
} from "lucide-react";

import type {
  ProjectProfile,
  IndustrySector,
} from "../../types/project";

import { mockProjects } from "../../data/mock/projects";
import { mockSchemes } from "../../data/mock/schemes";
import { matchSchemes } from "../../../lib/schemes/scheme-engine";

export default function SchemesPage() {
  const project = mockProjects[0];

  /*
   * Convert the existing mock project into the profile
   * expected by the scheme engine.
   *
   * We will later replace this with the actual
   * logged-in user's project from the database.
   */
  const locationParts = project.location?.split(",") ?? [];

  const projectProfile: ProjectProfile = {
    id: project.id,

    name: project.name ?? "Untitled Project",

    location:
      project.location ?? "Madhya Pradesh",

    industry:
      project.industry ?? "other",

    sector:
      (project.industry as IndustrySector) ?? "other",

    projectStage: "new_setup",

    investmentAmount: 10000000,

    state:
      locationParts[1]?.trim() || "Madhya Pradesh",

    district:
      locationParts[0]?.trim() || "",

    landStatus: "industrial_estate",

    builtUpArea: 0,

    employeeCount: 50,

    requiresConstruction: true,

    requiresElectricity: true,

    requiresWater: true,

    generatesWaste: true,

    usesHazardousMaterials: false,

    requiresBoiler: false,

    requiresFactoryLicense: true,
  };

  const matches = matchSchemes(
    projectProfile,
    mockSchemes
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--primary)]">
          Government Support
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          Government Schemes & Incentives
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          SANGAM has identified government schemes that may
          be relevant to your project based on its profile.
        </p>
      </div>

      {/* Project context */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Based on project
            </p>

            <h2 className="mt-1 font-semibold text-slate-950">
              {project.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {project.industry} · {project.location}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <Target className="h-4 w-4" />

            <span>
              {matches.length} potential match
              {matches.length !== 1 ? "es" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-slate-950">
            Potentially Relevant Schemes
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Matches are based on the information currently
            available in your project profile.
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <Landmark className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 font-medium text-slate-900">
              No matching schemes found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try updating your project profile with more
              information.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {matches.map((match) => (
              <SchemeCard
                key={match.scheme.id}
                match={match}
              />
            ))}
          </div>
        )}
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs leading-5 text-amber-800">
          <strong>Important:</strong> Scheme matches are
          indicative and based on the information provided.
          Final eligibility, benefit amount and applicable
          conditions must be verified with the relevant
          government authority.
        </p>
      </div>
    </div>
  );
}

function SchemeCard({
  match,
}: {
  match: ReturnType<typeof matchSchemes>[number];
}) {
  const {
    scheme,
    score,
    matchedCriteria,
    confidence,
  } = match;

  const confidenceStyles = {
    high: "bg-emerald-50 text-emerald-700",
    medium: "bg-amber-50 text-amber-700",
    low: "bg-slate-100 text-slate-600",
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="rounded-lg bg-slate-50 p-2.5">
            <Landmark className="h-5 w-5 text-slate-600" />
          </div>

          <div>
            <h3 className="font-semibold leading-6 text-slate-950">
              {scheme.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {scheme.authority}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            confidenceStyles[confidence]
          }`}
        >
          {score}% match
        </span>
      </div>

      {/* Category */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">
          {scheme.category}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600">
          <MapPin className="h-3 w-3" />
          {scheme.states.join(", ")}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {scheme.description}
      </p>

      {/* Benefit */}
      <div className="mt-4 rounded-lg bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Potential benefit
        </p>

        <p className="mt-1 text-sm leading-5 text-slate-700">
          {scheme.benefit}
        </p>
      </div>

      {/* Matched criteria */}
      {matchedCriteria.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-500">
            Matching factors
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {matchedCriteria.map((criterion) => (
              <span
                key={criterion}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700"
              >
                <CheckCircle2 className="h-3 w-3" />
                {criterion}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Eligibility */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-medium text-slate-500">
          Key eligibility conditions
        </p>

        <ul className="mt-2 space-y-1.5">
          {scheme.eligibility.map((item) => (
            <li
              key={item}
              className="text-xs text-slate-600"
            >
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Source */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-400">
            Last verified
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            {scheme.lastVerified}
          </p>
        </div>

        <a
          href={
            scheme.applicationUrl ??
            scheme.officialSource
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] hover:underline"
        >
          Official source
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}