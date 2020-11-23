import type { TestRail } from "./api";
import type {
  Plan,
  AddPlan,
  PlanEntry,
  AddPlanEntry,
  AddPlanEntryRun,
  UpdatePlanEntry,
} from "./interfaces";

export function getPlan(this: TestRail, plan_id: number) {
  return this.apiGet<Plan>("get_plan/" + plan_id);
}

export function getPlans(
  this: TestRail,
  project_id: number,
  filters?: {
    created_after?: number;
    created_before?: number;
    created_by?: number[];
    is_completed?: 0 | 1;
    limit?: number;
    offset?: number;
    milestone_id?: number[];
  }
) {
  return this.apiGet<Plan[]>("get_plans/" + project_id, {
    queryVariables: filters,
  });
}

export function addPlan(this: TestRail, project_id: number, plan: AddPlan) {
  return this.apiPost<Plan>("add_plan/" + project_id, plan);
}

export function addPlanEntry(
  this: TestRail,
  plan_id: number,
  data: AddPlanEntry
) {
  return this.apiPost<PlanEntry>("add_plan_entry/" + plan_id, data);
}

/**
 * @requires TestRail 6.4
 */
export function addRunToPlanEntry(
  this: TestRail,
  plan_id: number,
  entry_id: number,
  data: AddPlanEntryRun
) {
  return this.apiPost<PlanEntry>(
    "add_run_to_plan_entry/" + plan_id + "/" + entry_id,
    data
  );
}

export function updatePlan(this: TestRail, plan_id: number, data: AddPlan) {
  return this.apiPost<Plan>("update_plan/" + plan_id, data);
}

export function updatePlanEntry(
  this: TestRail,
  plan_id: number,
  entry_id: number,
  data: UpdatePlanEntry
) {
  return this.apiPost<PlanEntry>(
    "update_plan_entry/" + plan_id + "/" + entry_id,
    data
  );
}

/**
 * @requires TestRail 6.4
 */
export function updateRunInPlanEntry(
  this: TestRail,
  plan_id: number,
  run_id: number,
  data: UpdatePlanEntry
) {
  return this.apiPost<PlanEntry>(
    "update_run_in_plan_entry/" + plan_id + "/" + run_id,
    data
  );
}

/**
 * Please Note: Closing a test plan cannot be undone.
 */
export function closePlan(this: TestRail, plan_id: number) {
  return this.apiPost<Plan>("close_plan/" + plan_id);
}

/**
 * Please Note: Deleting a test plan cannot be undone and also permanently deletes all test runs & results of the test plan.
 */
export function deletePlan(this: TestRail, plan_id: number) {
  return this.apiPost("delete_plan/" + plan_id);
}

/**
 *  Please Note: Deleting a test run from a plan cannot be undone and also permanently deletes all related test results.
 */
export function deletePlanEntry(
  this: TestRail,
  plan_id: number,
  entry_id: number
) {
  return this.apiPost("delete_plan_entry/" + plan_id + "/" + entry_id);
}

export function deleteRunFromPlanEntry(this: TestRail, run_id: number) {
  return this.apiPost("delete_run_from_plan_entry/" + run_id);
}
