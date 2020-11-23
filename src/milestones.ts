import type { TestRail } from "./api";
import type { Milestone, AddMilestone, UpdateMilestone } from "./interfaces";

export function getMilestone(this: TestRail, milestone_id: number) {
  return this.apiGet<Milestone>("get_milestone/" + milestone_id);
}

export function getMilestones(
  this: TestRail,
  project_id: number,
  filters?: {
    is_completed?: 0 | 1;
    is_started?: 0 | 1;
  }
) {
  return this.apiGet<Milestone[]>("get_milestones/" + project_id, {
    queryVariables: filters,
  });
}

export function addMilestone(
  this: TestRail,
  project_id: number,
  muilestone: AddMilestone
) {
  return this.apiPost<Milestone>("add_milestone/" + project_id, muilestone);
}

export function updateMilestone(
  this: TestRail,
  milestone_id: number,
  muilestone: UpdateMilestone
) {
  return this.apiPost<Milestone>(
    "update_milestone/" + milestone_id,
    muilestone
  );
}

/**
 * Please Note: Deleting a milestone cannot be undone.
 */
export function deleteMilestone(this: TestRail, milestone_id: number) {
  return this.apiPost("delete_milestone/" + milestone_id);
}
