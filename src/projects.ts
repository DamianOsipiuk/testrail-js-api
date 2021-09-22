import type { TestRail } from "./api";
import type {
  BulkFilters,
  BulkResult,
  Project,
  AddProject,
  UpdateProject,
} from "./interfaces";

export function getProject(this: TestRail, project_id: number) {
  return this.apiGet<Project>("get_project/" + project_id);
}

export function getProjects(
  this: TestRail,
  filters?: BulkFilters & { is_completed?: 0 | 1 }
) {
  return this.apiGet<BulkResult<Project, "projects">>("get_projects", {
    queryVariables: filters,
  });
}

export function addProject(this: TestRail, data: AddProject) {
  return this.apiPost<Project>("add_project", data);
}

export function updateProject(
  this: TestRail,
  project_id: number,
  data: UpdateProject
) {
  return this.apiPost<Project>("update_project/" + project_id, data);
}

/**
 * Please Note: Deleting a project cannot be undone and also permanently deletes all test suites & cases, test runs & results and everything else that is part of the project.
 */
export function deleteProject(this: TestRail, project_id: number) {
  return this.apiPost("delete_project/" + project_id);
}
