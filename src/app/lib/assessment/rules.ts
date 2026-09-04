import type { ApprovalRule } from "../../types/approval-rule";

export const approvalRules: ApprovalRule[] = [
  {
    id: "building-approval",

    name: "Building Plan Approval",

    description:
      "Approval of building plans and proposed industrial infrastructure.",

    evaluate: (project) =>
      project.requiresConstruction,

    applicability: () => "required",

    reason: () =>
      "Required because the project involves construction or modification of industrial premises.",

    createApproval: () => ({
      id: "building-approval",
      name: "Building Plan Approval",
      department: "Local Authority",

      status: "ready",
      priority: "high",

      estimatedDays: 7,
      slaDays: 10,
      daysRemaining: 10,

      progress: 0,

      description:
        "Approval of building plans and proposed industrial infrastructure.",

      documents: [
        "Building Plan",
        "Site Plan",
        "Land Ownership / Lease Document",
      ],

      submittedDocuments: [],

      dependencies: [],

      lastUpdated: "Not started",
    }),
  },

  {
    id: "pollution-consent",

    name: "Consent to Establish",

    description:
      "Environmental consent required for eligible industrial activities.",

    evaluate: (project) =>
      project.generatesWaste ||
      project.usesHazardousMaterials ||
      project.sector === "manufacturing" ||
      project.sector === "chemical" ||
      project.sector === "pharmaceutical",

    applicability: (project) => {
      if (
        project.usesHazardousMaterials ||
        project.sector === "chemical"
      ) {
        return "required";
      }

      return "conditional";
    },

    reason: (project) => {
      if (project.usesHazardousMaterials) {
        return "Required because the project involves hazardous materials.";
      }

      if (project.sector === "chemical") {
        return "Required due to the nature of chemical industrial activity.";
      }

      return "May be required depending on the project's pollution category and activities.";
    },

    createApproval: () => ({
      id: "pollution-consent",
      name: "Consent to Establish",
      department: "Pollution Control Board",

      status: "ready",
      priority: "critical",

      estimatedDays: 10,
      slaDays: 15,
      daysRemaining: 15,

      progress: 0,

      description:
        "Environmental consent required before establishing eligible industrial activities.",

      documents: [
        "Project Report",
        "Site Plan",
        "Process Flow Diagram",
        "Water Requirement",
        "Environmental Information",
      ],

      submittedDocuments: [],

      dependencies: [],

      lastUpdated: "Not started",
    }),
  },

  {
    id: "fire-noc",

    name: "Fire Safety NOC",

    description:
      "Fire safety approval based on building layout and safety systems.",

    evaluate: (project) =>
      project.requiresConstruction,

    applicability: (project) => {
      if (project.builtUpArea > 5000) {
        return "required";
      }

      return "conditional";
    },

    reason: (project) => {
      if (project.builtUpArea > 5000) {
        return "Required because the proposed built-up area exceeds the configured threshold.";
      }

      return "Fire clearance may be required depending on building use and applicable fire-safety requirements.";
    },

    createApproval: () => ({
      id: "fire-noc",
      name: "Fire Safety NOC",
      department: "Fire & Emergency Services",

      status: "not_started",
      priority: "high",

      estimatedDays: 5,
      slaDays: 7,
      daysRemaining: 7,

      progress: 0,

      description:
        "Fire safety approval based on building layout, occupancy and fire protection systems.",

      documents: [
        "Building Plan",
        "Fire Safety Plan",
        "Emergency Exit Plan",
      ],

      submittedDocuments: [],

      dependencies: ["building-approval"],

      lastUpdated: "Not started",
    }),
  },

  {
    id: "factory-license",

    name: "Factory License",

    description:
      "Registration and licensing of eligible factory premises.",

    evaluate: (project) =>
      project.requiresFactoryLicense,

    applicability: () => "required",

    reason: () =>
      "Required because the project will operate as a regulated factory establishment.",

    createApproval: () => ({
      id: "factory-license",
      name: "Factory License",
      department: "Labour Department",

      status: "not_started",
      priority: "high",

      estimatedDays: 10,
      slaDays: 15,
      daysRemaining: 15,

      progress: 0,

      description:
        "Factory registration and licensing for eligible industrial establishments.",

      documents: [
        "Building Plan",
        "Machinery Details",
        "Occupier Details",
        "Worker Details",
      ],

      submittedDocuments: [],

      dependencies: ["building-approval"],

      lastUpdated: "Not started",
    }),
  },

  {
    id: "electricity-connection",

    name: "Industrial Electricity Connection",

    description:
      "Application for industrial electricity connection.",

    evaluate: (project) =>
      project.requiresElectricity,

    applicability: () => "required",

    reason: () =>
      "Required because the project requires an industrial electricity connection.",

    createApproval: () => ({
      id: "electricity-connection",
      name: "Industrial Electricity Connection",
      department: "Electricity Distribution Utility",

      status: "ready",
      priority: "medium",

      estimatedDays: 15,
      slaDays: 20,
      daysRemaining: 20,

      progress: 0,

      description:
        "Industrial power connection based on sanctioned load and project requirements.",

      documents: [
        "Identity Proof",
        "Land / Premises Document",
        "Load Requirement",
        "Project Details",
      ],

      submittedDocuments: [],

      dependencies: ["building-approval"],

      lastUpdated: "Not started",
    }),
  },
];