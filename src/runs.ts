import type { TestRail } from "./api";
import type {
  BulkFilters,
  BulkResult,
  Run,
  AddRun,
  UpdateRun,
} from "./interfaces";

export function getRun(this: TestRail, run_id: number) {
  return this.apiGet<Run>("get_run/" + run_id);
}

export function getRuns(
  this: TestRail,
  project_id: number,
  filters?: BulkFilters & {
    created_after?: number;
    created_before?: number;
    created_by?: number[];
    is_completed?: 0 | 1;
    milestone_id?: number[];
    refs_filter?: string;
    suite_id?: number[];
  }
) {
  return this.apiGet<BulkResult<Run, "runs">>("get_runs/" + project_id, {
    queryVariables: filters,
  });
}

export function addRun(this: TestRail, project_id: number, data: AddRun) {
  return this.apiPost<Run>("add_run/" + project_id, data);
}

export function updateRun(this: TestRail, run_id: number, data: UpdateRun) {
  return this.apiPost<Run>("update_run/" + run_id, data);
}

/**
 * Please Note: Closing a test run cannot be undone.
 */
export function closeRun(this: TestRail, run_id: number) {
  return this.apiPost<Run>("close_run/" + run_id);
}

/**
 * Please Note: Deleting a test run cannot be undone and also permanently deletes all tests & results of the test run.
 */
export function deleteRun(this: TestRail, run_id: number) {
  return this.apiPost("delete_run/" + run_id);
}
