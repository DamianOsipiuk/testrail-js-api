import type { TestRail } from "./api";
import type { Status } from "./interfaces";

export function getStatuses(this: TestRail) {
  return this.apiGet<Status[]>("get_statuses");
}
