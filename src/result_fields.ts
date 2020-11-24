import type { TestRail } from "./api";
import type { ResultField } from "./interfaces";

export function getResultFields(this: TestRail) {
  return this.apiGet<ResultField[]>("get_result_fields");
}
