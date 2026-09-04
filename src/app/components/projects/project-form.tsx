"use client";

import { useState } from "react";

import type { ProjectFormData } from "../../types/project-form";

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
}

const initialFormData: ProjectFormData = {
  name: "",
  sector: "",
  projectStage: "",
  investmentAmount: "",
  state: "",
  district: "",
  landStatus: "",
  builtUpArea: "",
  employeeCount: "",
  requiresConstruction: false,
  requiresElectricity: false,
  requiresWater: false,
  generatesWaste: false,
  usesHazardousMaterials: false,
  requiresBoiler: false,
  requiresFactoryLicense: false,
};

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [formData, setFormData] =
    useState<ProjectFormData>(initialFormData);

  const updateField = <K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Project Information */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Project Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Provide basic information about your industrial project.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Project Name"
            value={formData.name}
            onChange={(value) => updateField("name", value)}
            placeholder="e.g. ABC Manufacturing Unit"
          />

          <SelectField
            label="Industry Sector"
            value={formData.sector}
            onChange={(value) => updateField("sector", value)}
            options={[
              ["", "Select sector"],
              ["manufacturing", "Manufacturing"],
              ["food_processing", "Food Processing"],
              ["textile", "Textile"],
              ["pharmaceutical", "Pharmaceutical"],
              ["it", "IT"],
              ["construction", "Construction"],
              ["automotive", "Automotive"],
              ["chemical", "Chemical"],
              ["other", "Other"],
            ]}
          />

          <SelectField
            label="Project Stage"
            value={formData.projectStage}
            onChange={(value) =>
              updateField("projectStage", value)
            }
            options={[
              ["", "Select project stage"],
              ["new_setup", "New Setup"],
              ["expansion", "Expansion"],
              ["modernization", "Modernization"],
              ["operational", "Operational"],
            ]}
          />

          <Field
            label="Investment Amount"
            type="number"
            value={formData.investmentAmount}
            onChange={(value) =>
              updateField("investmentAmount", value)
            }
            placeholder="Investment amount in ₹"
          />
        </div>
      </section>

      {/* Location */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Location & Land
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Location can affect applicable approvals and authorities.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="State"
            value={formData.state}
            onChange={(value) => updateField("state", value)}
            placeholder="e.g. Madhya Pradesh"
          />

          <Field
            label="District"
            value={formData.district}
            onChange={(value) => updateField("district", value)}
            placeholder="e.g. Indore"
          />

          <SelectField
            label="Land Status"
            value={formData.landStatus}
            onChange={(value) =>
              updateField("landStatus", value)
            }
            options={[
              ["", "Select land status"],
              ["owned", "Owned"],
              ["leased", "Leased"],
              ["to_be_acquired", "To Be Acquired"],
              ["industrial_estate", "Industrial Estate"],
            ]}
          />

          <Field
            label="Built-up Area (sq. ft.)"
            type="number"
            value={formData.builtUpArea}
            onChange={(value) =>
              updateField("builtUpArea", value)
            }
            placeholder="e.g. 25000"
          />
        </div>
      </section>

      {/* Project Scale */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Project Scale
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            These values help determine applicable regulatory requirements.
          </p>
        </div>

        <Field
          label="Expected Employee Count"
          type="number"
          value={formData.employeeCount}
          onChange={(value) =>
            updateField("employeeCount", value)
          }
          placeholder="e.g. 100"
        />
      </section>

      {/* Requirements */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Project Requirements
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the facilities and activities applicable to your project.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <CheckboxField
            label="Requires Construction"
            checked={formData.requiresConstruction}
            onChange={(value) =>
              updateField("requiresConstruction", value)
            }
          />

          <CheckboxField
            label="Requires Electricity Connection"
            checked={formData.requiresElectricity}
            onChange={(value) =>
              updateField("requiresElectricity", value)
            }
          />

          <CheckboxField
            label="Requires Water Connection"
            checked={formData.requiresWater}
            onChange={(value) =>
              updateField("requiresWater", value)
            }
          />

          <CheckboxField
            label="Generates Industrial Waste"
            checked={formData.generatesWaste}
            onChange={(value) =>
              updateField("generatesWaste", value)
            }
          />

          <CheckboxField
            label="Uses Hazardous Materials"
            checked={formData.usesHazardousMaterials}
            onChange={(value) =>
              updateField("usesHazardousMaterials", value)
            }
          />

          <CheckboxField
            label="Requires Boiler"
            checked={formData.requiresBoiler}
            onChange={(value) =>
              updateField("requiresBoiler", value)
            }
          />

          <CheckboxField
            label="Requires Factory License"
            checked={formData.requiresFactoryLicense}
            onChange={(value) =>
              updateField("requiresFactoryLicense", value)
            }
          />
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          Analyze Project
        </button>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Fields                                                                     */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        min={type === "number" ? "0" : undefined}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
      />
    </div>
  );
}

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: [T, string][];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as T)
        }
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="h-4 w-4 rounded border-slate-300 accent-[var(--primary)]"
      />

      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>
    </label>
  );
}