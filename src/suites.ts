import type { TestRail } from "./api";
import type { AddSuite, Suite } from "./interfaces";

export function getSuite(this: TestRail, suite_id: number) {
  return this.apiGet<Suite>("get_suite/" + suite_id);
}

export function getSuites(this: TestRail, project_id: number) {
  return this.apiGet<Suite[]>("get_suites/" + project_id);
}

export function addSuite(this: TestRail, project_id: number, data: AddSuite) {
  return this.apiPost<Suite>("add_suite/" + project_id, data);
}

export function updateSuite(this: TestRail, suite_id: number, data: AddSuite) {
  return this.apiPost<Suite>("update_suite/" + suite_id, data);
}

/**
 * Please Note: Deleting a test suite cannot be undone and also deletes all active test runs & results, i.e. test runs & results that weren’t closed (archived) yet.
 */
export function deleteSuite(
  this: TestRail,
  suite_id: number,
  queryVariables?: {
    soft?: 0 | 1;
  }
) {
  return this.apiPost("delete_suite/" + suite_id, undefined, {
    queryVariables,
  });
}
