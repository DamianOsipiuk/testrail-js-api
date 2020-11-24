import type { TestRail } from "./api";
import type { CaseType } from "./interfaces";

export function getCaseTypes(this: TestRail) {
  return this.apiGet<CaseType>("get_case_types");
}
