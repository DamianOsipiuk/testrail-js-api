import type { TestRail } from "./api";
import type { BulkFilters, BulkResult, Test } from "./interfaces";

export function getTest(this: TestRail, test_id: number) {
  return this.apiGet<Test>("get_test/" + test_id);
}

export function getTests(
  this: TestRail,
  run_id: number,
  filters?: BulkFilters & {
    status_id?: number[];
  }
) {
  return this.apiGet<BulkResult<Test, "tests">>("get_tests/" + run_id, {
    queryVariables: filters,
  });
}
