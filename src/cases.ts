import type { TestRail } from "./api";
import type { Case, AddCase, CaseHistory } from "./interfaces";

export function getCase(this: TestRail, case_id: number) {
  return this.apiGet<Case>("get_case/" + case_id);
}

export function getCases(
  this: TestRail,
  project_id: number,
  queryVariables?: {
    created_after?: number;
    created_before?: number;
    created_by?: number[];
    filter?: string;
    limit?: number;
    offset?: number;
    milestone_id?: number[];
    priority_id?: number[];
    refs_filter?: string;
    section_id?: number;
    suite_id?: number;
    template_id?: number[];
    type_id?: number[];
    updated_after?: number;
    updated_before?: number;
    updated_by?: number[];
  }
) {
  return this.apiGet<Case[]>("get_cases/" + project_id, {
    queryVariables,
  });
}

export function getHistoryForCase(this: TestRail, case_id: number) {
  return this.apiGet<CaseHistory>("get_history_for_case/" + case_id);
}

export function addCase(
  this: TestRail,
  section_id: number,
  case_data: AddCase
) {
  return this.apiPost<Case>("add_case/" + section_id, case_data);
}

export function updateCase(
  this: TestRail,
  case_id: number,
  case_data: AddCase
) {
  return this.apiPost<Case>("update_case/" + case_id, case_data);
}

export function updateCases(
  this: TestRail,
  project_id: number,
  case_data: AddCase,
  queryVariables?: {
    suite_id?: number;
  }
) {
  return this.apiPost<Case>("update_cases/" + project_id, case_data, {
    queryVariables,
  });
}

/**
 * Please Note: Deleting a test case cannot be undone and also permanently deletes all test results in active test runs (i.e. test runs that haven’t been closed (archived) yet).
 */
export function deleteCase(this: TestRail, case_id: number) {
  return this.apiPost("delete_case/" + case_id);
}

/**
 * Please Note: Deleting a test case cannot be undone and also permanently deletes all test results in active test runs (i.e. test runs that haven’t been closed (archived) yet).
 */
export function deleteCases(
  this: TestRail,
  project_id: number,
  case_ids: number[],
  queryVariables?: {
    suite_id?: number;
    soft?: 0 | 1;
  }
) {
  return this.apiPost(
    "delete_cases/" + project_id,
    { case_ids },
    { queryVariables }
  );
}
