import type { ProjectProfile } from "../../app/types/project";

const PROJECTS_KEY = "sangam_projects";

export function getStoredProjects(): ProjectProfile[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(PROJECTS_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? (parsed as ProjectProfile[])
      : [];
  } catch {
    return [];
  }
}

export function saveProject(project: ProjectProfile): void {
  if (typeof window === "undefined") {
    return;
  }

  const projects = getStoredProjects();

  const existingIndex = projects.findIndex(
    (item) => item.id === project.id
  );

  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }

  localStorage.setItem(
    PROJECTS_KEY,
    JSON.stringify(projects)
  );
}

export function getProjectById(
  projectId: string
): ProjectProfile | null {
  const projects = getStoredProjects();

  return (
    projects.find((project) => project.id === projectId) ??
    null
  );
}

export function deleteProject(projectId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const projects = getStoredProjects().filter(
    (project) => project.id !== projectId
  );

  localStorage.setItem(
    PROJECTS_KEY,
    JSON.stringify(projects)
  );
}