import type { Scheme } from "../schemes/scheme-types";

export const mockSchemes: Scheme[] = [
  {
    id: "mp-investment-promotion-2025",

    name: "Madhya Pradesh Investment Promotion Scheme 2025",

    authority:
      "Department of Industrial Policy and Investment Promotion, Government of Madhya Pradesh",

    category: "Investment Promotion",

    description:
      "Investment promotion support for eligible industrial projects in Madhya Pradesh.",

    benefit:
      "Eligible projects may receive investment-linked incentives and other policy benefits subject to applicable conditions.",

    eligibility: [
      "Eligible industrial project in Madhya Pradesh",
      "Project must satisfy applicable investment and sector conditions",
      "Statutory approvals and policy conditions apply",
    ],

    sectors: [
      "manufacturing",
      "food_processing",
      "textile",
      "pharmaceutical",
      "automotive",
      "chemical",
      "it",
      "construction",
    ],

    projectStages: [
      "new_setup",
      "expansion",
      "modernization",
    ],

    states: ["Madhya Pradesh"],

    officialSource:
      "https://invest.mp.gov.in/for-investors-policy-notifications/",

    lastVerified: "2026-08-30",
  },

  {
    id: "mp-msme-development-2025",

    name: "Madhya Pradesh MSME Development Policy 2025",

    authority:
      "Department of Micro, Small & Medium Enterprises, Government of Madhya Pradesh",

    category: "MSME Incentive",

    description:
      "Policy framework providing incentives and support for eligible MSME industrial units.",

    benefit:
      "Potential investment promotion, infrastructure, quality, energy and other eligible assistance depending on the project.",

    eligibility: [
      "Eligible MSME unit",
      "Investment must fall within applicable policy limits",
      "Project must satisfy applicable sector and statutory requirements",
    ],

    sectors: [
      "manufacturing",
      "food_processing",
      "textile",
      "pharmaceutical",
      "automotive",
      "chemical",
    ],

    projectStages: [
      "new_setup",
      "expansion",
      "modernization",
    ],

    maxInvestment: 100000000,

    states: ["Madhya Pradesh"],

    officialSource:
      "https://invest.mp.gov.in/policy-acts-rules/",

    lastVerified: "2026-08-30",
  },

  {
    id: "mp-food-processing-support",

    name: "Food Processing Industry Support",

    authority:
      "Government of Madhya Pradesh",

    category: "Sector Incentive",

    description:
      "Support available for eligible food processing projects under applicable Madhya Pradesh industrial policies.",

    benefit:
      "Potential support for power tariff, infrastructure, quality certification, research and development and eligible plant and machinery investment.",

    eligibility: [
      "Food processing activity",
      "Eligible industrial unit",
      "Applicable investment and statutory conditions must be satisfied",
    ],

    sectors: ["food_processing"],

    projectStages: [
      "new_setup",
      "expansion",
      "modernization",
    ],

    states: ["Madhya Pradesh"],

    officialSource:
      "https://invest.mp.gov.in/previous-portal/policy-notifications-msme-development/",

    lastVerified: "2026-08-30",
  },

  {
    id: "mp-textile-garment-incentives",

    name: "Madhya Pradesh Textile & Garment Incentives",

    authority:
      "Department of Industrial Policy and Investment Promotion, Government of Madhya Pradesh",

    category: "Textile & Garment",

    description:
      "Investment and employment-related incentives for eligible textile and garment projects.",

    benefit:
      "Potential investment promotion assistance, employment incentives, interest subsidy, infrastructure support and other eligible benefits.",

    eligibility: [
      "Eligible textile or garment project",
      "Applicable investment requirements",
      "Employment and policy conditions apply",
    ],

    sectors: ["textile"],

    projectStages: [
      "new_setup",
      "expansion",
      "modernization",
    ],

    states: ["Madhya Pradesh"],

    officialSource:
      "https://invest.mp.gov.in/previous-portal/rs_elements/tab-textile-and-garments-policy-incentives/",

    lastVerified: "2026-08-30",
  },
];