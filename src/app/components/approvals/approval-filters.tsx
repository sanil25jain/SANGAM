"use client";

import { Search } from "lucide-react";

interface ApprovalFiltersProps {
  search: string;
  status: string;
  department: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}

export function ApprovalFilters({
  search,
  status,
  department,
  onSearchChange,
  onStatusChange,
  onDepartmentChange,
}: ApprovalFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search approvals..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-[var(--primary)] focus:bg-white"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none"
      >
        <option value="all">All Statuses</option>
        <option value="ready">Ready</option>
        <option value="under_review">Under Review</option>
        <option value="query">Query Raised</option>
        <option value="inspection">Inspection</option>
        <option value="approved">Approved</option>
      </select>

      <select
        value={department}
        onChange={(event) =>
          onDepartmentChange(event.target.value)
        }
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none"
      >
        <option value="all">All Departments</option>
        <option value="Labour Department">
          Labour Department
        </option>
        <option value="Pollution Control Board">
          Pollution Control Board
        </option>
        <option value="Fire & Emergency Services">
          Fire & Emergency Services
        </option>
        <option value="Local Authority">
          Local Authority
        </option>
        <option value="Tax Department">
          Tax Department
        </option>
      </select>
    </div>
  );
}