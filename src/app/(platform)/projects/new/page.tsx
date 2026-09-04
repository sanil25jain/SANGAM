"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { ProjectFormData } from "../../../types/project-form";
import { ProjectForm } from "../../../components/projects/project-form";
import { ProjectStepper } from "../../../components/projects/project-stepper";
import { AssessmentResult } from "../../../components/projects/assessment-result";
import { assessProject } from "../../../lib/assessment/approval-engine";
import { normalizeProjectProfile } from "../../../lib/project/normalize-profile";

export default function NewProjectPage() {
  const router = useRouter();

  const [assessment, setAssessment] = useState<
    ReturnType<typeof assessProject> | null
  >(null);

  const handleSubmit = (formData: ProjectFormData) => {
    const profile = normalizeProjectProfile(formData);

    console.log("Project Profile:", profile);

    const nextAssessment = assessProject(profile);
    setAssessment(nextAssessment);
  };

  if (assessment) {
    return (
      <div className="mx-auto max-w-6xl space-y-8">
        <AssessmentResult assessments={assessment} />

        <div className="flex justify-end">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-[var(--primary)]">
          New Project
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
          Create your industrial project
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Tell SANGAM about your project so we can identify applicable
          approvals and requirements.
        </p>
      </div>

      <ProjectStepper currentStep={1} />

      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
}