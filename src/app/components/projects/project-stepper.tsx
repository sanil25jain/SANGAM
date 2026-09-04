"use client";

interface ProjectStepperProps {
  currentStep: number;
}

const steps = [
  "Project Details",
  "Business Profile",
  "Requirements",
  "Assessment",
];

export function ProjectStepper({
  currentStep,
}: ProjectStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                    completed
                      ? "bg-[var(--primary)] text-white"
                      : active
                        ? "border-2 border-[var(--primary)] bg-white text-[var(--primary)]"
                        : "border border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {completed ? "✓" : stepNumber}
                </div>

                <span
                  className={`hidden text-sm sm:block ${
                    active || completed
                      ? "font-medium text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-px flex-1 ${
                    completed
                      ? "bg-[var(--primary)]"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}