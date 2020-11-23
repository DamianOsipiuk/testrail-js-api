import type { TestRail } from "./api";
import type {
  ConfigurationGroup,
  AddConfiguration,
  ConfigurationEntry,
} from "./interfaces";

export function getConfigs(this: TestRail, project_id: number) {
  return this.apiGet<ConfigurationGroup[]>("get_configs/" + project_id);
}

export function addConfigGroup(
  this: TestRail,
  project_id: number,
  configuration_group: AddConfiguration
) {
  return this.apiPost<ConfigurationGroup>(
    "add_config_group/" + project_id,
    configuration_group
  );
}

export function addConfig(
  this: TestRail,
  config_group_id: number,
  config: AddConfiguration
) {
  return this.apiPost<ConfigurationEntry>(
    "add_config/" + config_group_id,
    config
  );
}

export function updateConfigGroup(
  this: TestRail,
  config_group_id: number,
  config: AddConfiguration
) {
  return this.apiPost<ConfigurationGroup>(
    "update_config_group/" + config_group_id,
    config
  );
}

export function updateConfig(
  this: TestRail,
  config_id: number,
  config: AddConfiguration
) {
  return this.apiPost<ConfigurationEntry>("update_config/" + config_id, config);
}

/**
 * Please Note: Deleting a configuration group cannot be undone and also permanently deletes all configurations in this group. It does not, however, affect closed test plans/runs, or active test plans/runs unless they are updated.
 */
export function deleteConfigGroup(this: TestRail, config_group_id: number) {
  return this.apiPost("delete_config_group/" + config_group_id);
}

/**
 * Please Note: Deleting a configuration cannot be undone. It does not, however, affect closed test plans/runs, or active test plans/runs unless they are updated.
 */
export function deleteConfig(this: TestRail, config_id: number) {
  return this.apiPost("delete_config/" + config_id);
}
