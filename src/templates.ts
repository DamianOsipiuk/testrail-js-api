import type { TestRail } from "./api";
import type { Template } from "./interfaces";

/**
 * @requires TestRail 5.2
 */
export function getTemplates(this: TestRail, project_id: number) {
  return this.apiGet<Template>("get_templates/" + project_id);
}
