import type { Inspection } from "../../types/inspection";

export const mockInspections: Inspection[] = [
  {
    id: "inspection-001",
    approvalId: "fire-noc",
    approvalName: "Fire Safety NOC",
    department: "Fire & Emergency Services",
    scheduledDate: "2026-09-20",
    scheduledTime: "11:00 AM",
    inspector: "Assigned Inspector",
    location: "Project Site",
    status: "scheduled",
    notes: "Site inspection for fire safety compliance.",
  },

  {
    id: "inspection-002",
    approvalId: "factory-license",
    approvalName: "Factory License",
    department: "Labour Department",
    scheduledDate: "2026-09-12",
    scheduledTime: "10:30 AM",
    inspector: "Assigned Inspector",
    location: "Project Site",
    status: "pending",
    notes: "Factory premises inspection pending scheduling.",
  },

  {
    id: "inspection-003",
    approvalId: "pollution-consent",
    approvalName: "Consent to Establish",
    department: "Pollution Control Board",
    scheduledDate: "2026-09-08",
    scheduledTime: "02:00 PM",
    inspector: "Environmental Inspector",
    location: "Project Site",
    status: "scheduled",
    notes: "Environmental site inspection.",
  },

  {
    id: "inspection-004",
    approvalId: "building-approval",
    approvalName: "Building Plan Approval",
    department: "Local Authority",
    scheduledDate: "2026-08-25",
    scheduledTime: "11:30 AM",
    inspector: "Building Inspector",
    location: "Project Site",
    status: "completed",
    notes: "Building inspection completed successfully.",
  },
];