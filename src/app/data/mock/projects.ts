import type { Project } from "../../types/project";

export const mockProjects: Project[] = [
  {
    id: "project-001",
    name: "ABC Foods Manufacturing Unit",
    industry: "Food Processing",
    location: "Indore, Madhya Pradesh",
    investment: 20_000_0000,
    status: "in_progress",
    approvalCount: 23,
    completedApprovals: 11,
    createdAt: "2026-08-21",
    landArea: 18000,
    employees: 420,
    powerRequirement: 4800,
    waterRequirement: 2200,
    projectStage: "planning",
  } as Project,
];