import type { TestRail } from "./api";
import type { CaseField, AddCaseField } from "./interfaces";

export function getCaseFields(this: TestRail) {
  return this.apiGet<CaseField[]>("get_case_fields");
}

export function add_case_field(this: TestRail, case_field: AddCaseField) {
  return this.apiPost<CaseField>("add_case_field", case_field);
}
