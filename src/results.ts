import type { TestRail } from "./api";
import type {
  BulkFilters,
  BulkResult,
  Result,
  AddResult,
  AddResultForCase,
  AddMultipleResult,
} from "./interfaces";

export function getResults(
  this: TestRail,
  test_id: number,
  filters?: BulkFilters & {
    defects_filter?: string;
    status_id?: number[];
  }
) {
  return this.apiGet<BulkResult<Result, "results">>("get_results/" + test_id, {
    queryVariables: filters,
  });
}

export function getResultsForCase(
  this: TestRail,
  run_id: number,
  case_id: number,
  filters?: BulkFilters & {
    defects_filter?: string;
    status_id?: number[];
  }
) {
  return this.apiGet<BulkResult<Result, "results">>(
    "get_results_for_case/" + run_id + "/" + case_id,
    { queryVariables: filters }
  );
}

export function getResultsForRun(
  this: TestRail,
  run_id: number,
  filters?: BulkFilters & {
    created_after?: number;
    created_before?: number;
    created_by?: number[];
    defects_filter?: string;
    status_id?: number[];
  }
) {
  return this.apiGet<BulkResult<Result, "results">>(
    "get_results_for_run/" + run_id,
    {
      queryVariables: filters,
    }
  );
}

export function addResult(this: TestRail, test_id: number, data: AddResult) {
  return this.apiPost<Result>("add_result/" + test_id, data);
}

export function addResultForCase(
  this: TestRail,
  run_id: number,
  case_id: number,
  data: AddResult
) {
  return this.apiPost<Result>(
    "add_result_for_case/" + run_id + "/" + case_id,
    data
  );
}

export function addResults(
  this: TestRail,
  run_id: number,
  results: AddMultipleResult[]
) {
  return this.apiPost<Result[]>("add_results/" + run_id, {
    results,
  });
}

export function addResultsForCases(
  this: TestRail,
  run_id: number,
  results: AddResultForCase[]
) {
  return this.apiPost<Result[]>("add_results_for_cases/" + run_id, {
    results,
  });
}
