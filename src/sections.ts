import type { TestRail } from "./api";
import type { Section, AddSection, UpdateSection } from "./interfaces";

export function getSection(this: TestRail, section_id: number) {
  return this.apiGet<Section>("get_section/" + section_id);
}

export function getSections(
  this: TestRail,
  project_id: number,
  filters?: {
    suite_id?: number;
  }
) {
  return this.apiGet<Section[]>("get_sections/" + project_id, {
    queryVariables: filters,
  });
}

export function addSection(
  this: TestRail,
  project_id: number,
  data: AddSection
) {
  return this.apiPost<Section>("add_section/" + project_id, data);
}

export function updateSection(
  this: TestRail,
  section_id: number,
  data: UpdateSection
) {
  return this.apiPost<Section>("update_section/" + section_id, data);
}

/**
 * Please Note: Deleting a section cannot be undone and also deletes all related test cases as well as active tests & results, i.e. tests & results that weren’t closed (archived) yet.
 */
export function deleteSection(this: TestRail, section_id: number) {
  return this.apiPost("delete_section/" + section_id);
}
