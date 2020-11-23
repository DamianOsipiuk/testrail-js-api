import type { TestRail } from "./api";
import type { Priority } from "./interfaces";

export function getPriorities(this: TestRail) {
  return this.apiGet<Priority>("get_priorities");
}
