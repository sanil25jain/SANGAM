import type { Approval } from "../../types/approval";

export const mockApprovals: Approval[] = [
  {
    id: "factory-license",
    name: "Factory License",
    department: "Labour Department",
    status: "approved",
    priority: "critical",
    estimatedDays: 7,
    slaDays: 10,
    daysRemaining: 0,
    progress: 100,
    description:
      "Registration and licensing required for operating an eligible manufacturing facility.",
    documents: [
      "Company Incorporation Certificate",
      "Building Plan",
      "Machinery Details",
      "Occupancy Certificate",
    ],
    submittedDocuments: [
      "Company Incorporation Certificate",
      "Building Plan",
      "Machinery Details",
      "Occupancy Certificate",
    ],
    dependencies: ["building-approval"],
    lastUpdated: "3 days ago",
  },

  {
    id: "pollution-consent",
    name: "Consent to Establish",
    department: "Pollution Control Board",
    status: "under_review",
    priority: "critical",
    estimatedDays: 10,
    slaDays: 15,
    daysRemaining: 4,
    progress: 65,
    description:
      "Environmental consent required before establishing eligible industrial activities.",
    documents: [
      "Project Report",
      "Site Plan",
      "Water Requirement",
      "Process Flow Diagram",
      "Environmental Information",
    ],
    submittedDocuments: [
      "Project Report",
      "Site Plan",
      "Water Requirement",
      "Process Flow Diagram",
    ],
    dependencies: [],
    lastUpdated: "2 hours ago",
  },

  {
    id: "fire-noc",
    name: "Fire Safety NOC",
    department: "Fire & Emergency Services",
    status: "inspection",
    priority: "high",
    estimatedDays: 5,
    slaDays: 7,
    daysRemaining: 2,
    progress: 70,
    description:
      "Fire safety approval based on building layout, occupancy and fire protection systems.",
    documents: [
      "Building Plan",
      "Fire Safety Plan",
      "Emergency Exit Plan",
    ],
    submittedDocuments: [
      "Building Plan",
      "Fire Safety Plan",
      "Emergency Exit Plan",
    ],
    dependencies: ["building-approval"],
    lastUpdated: "Yesterday",
  },

  {
    id: "building-approval",
    name: "Building Plan Approval",
    department: "Local Authority",
    status: "approved",
    priority: "high",
    estimatedDays: 12,
    slaDays: 15,
    daysRemaining: 0,
    progress: 100,
    description:
      "Approval of the proposed industrial building and site development plan.",
    documents: [
      "Site Plan",
      "Building Plan",
      "Land Ownership Document",
    ],
    submittedDocuments: [
      "Site Plan",
      "Building Plan",
      "Land Ownership Document",
    ],
    dependencies: [],
    lastUpdated: "5 days ago",
  },

  {
    id: "electricity",
    name: "Industrial Electricity Connection",
    department: "Electricity Distribution Utility",
    status: "ready",
    priority: "medium",
    estimatedDays: 8,
    slaDays: 12,
    daysRemaining: 12,
    progress: 0,
    description:
      "Industrial power connection based on sanctioned load requirements.",
    documents: [
      "Land Document",
      "Project Details",
      "Electrical Load Requirement",
    ],
    submittedDocuments: [],
    dependencies: ["building-approval"],
    lastUpdated: "1 day ago",
  },

  {
    id: "water",
    name: "Industrial Water Connection",
    department: "Water Supply Authority",
    status: "not_started",
    priority: "medium",
    estimatedDays: 10,
    slaDays: 15,
    daysRemaining: 15,
    progress: 0,
    description:
      "Industrial water supply connection based on project consumption requirements.",
    documents: [
      "Land Document",
      "Project Report",
      "Water Requirement Details",
    ],
    submittedDocuments: [],
    dependencies: [],
    lastUpdated: "4 days ago",
  },

  {
    id: "gst",
    name: "GST Registration",
    department: "Tax Department",
    status: "approved",
    priority: "high",
    estimatedDays: 3,
    slaDays: 5,
    daysRemaining: 0,
    progress: 100,
    description:
      "Tax registration required based on applicable business and tax requirements.",
    documents: [
      "PAN",
      "Business Registration",
      "Address Proof",
    ],
    submittedDocuments: [
      "PAN",
      "Business Registration",
      "Address Proof",
    ],
    dependencies: [],
    lastUpdated: "1 week ago",
  },

  {
    id: "factory-registration",
    name: "Factory Registration",
    department: "Labour Department",
    status: "ready",
    priority: "high",
    estimatedDays: 5,
    slaDays: 10,
    daysRemaining: 10,
    progress: 0,
    description:
      "Registration of the industrial establishment with the relevant authority.",
    documents: [
      "Company Registration",
      "Occupancy Details",
      "Employee Details",
    ],
    submittedDocuments: [],
    dependencies: [],
    lastUpdated: "3 hours ago",
  },
];