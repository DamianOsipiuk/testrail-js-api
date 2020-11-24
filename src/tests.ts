import type { TestRail } from "./api";
import type { Test } from "./interfaces";

export function getTest(this: TestRail, test_id: number) {
  return this.apiGet<Test>("get_test/" + test_id);
}

export function getTests(
  this: TestRail,
  run_id: number,
  filters?: {
    status_id?: number[];
  }
) {
  return this.apiGet<Test[]>("get_tests/" + run_id, {
    queryVariables: filters,
  });
}
