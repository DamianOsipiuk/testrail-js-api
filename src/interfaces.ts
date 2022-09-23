import { ParsedUrlQueryInput } from "querystring";

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
}

export const enum RequestType {
  JSON = 1,
  Blob,
}

export interface RequestOptions {
  requestType?: RequestType;
  headers?: Record<string, string>;
  queryVariables?: ParsedUrlQueryInput;
}

export enum TestStatus {
  Passed = 1,
  Blocked,
  Untested, // Cannot add this status when posting a result
  Retest,
  Failed,
}

export enum FieldType {
  String = 1,
  Integer,
  Text,
  URL,
  Checkbox,
  Dropdown,
  User,
  Date,
  Milestone,
  Steps,
  Multiselect,
}

export enum SuiteMode {
  SingleSuite = 1,
  SingleSuiteWithBaseline,
  MultipleSuites,
}

export interface Context {
  is_global: boolean;
  project_ids: null;
}

export type BulkResult<Type, PropertyName extends string> = {
  offset: number;
  limit: number;
  size: number;
  _links: {
    next: string | null;
    prev: string | null;
  };
} & { [P in PropertyName]: Type[] };

export type BulkFilters = {
  limit?: number;
  offset?: number;
};

//#region Attachments
export interface Attachment {
  id: number;
  name: string;
  size: number;
  created_on: number;
  project_id: number;
  case_id: number;
  user_id: number;
  result_id: number;
}

export interface AddAttachmentResult {
  attachment_id: number;
}
//#endregion

//#region Cases
export interface Case {
  created_by: number;
  created_on: number;
  estimate: string;
  estimate_forecast: string;
  id: number;
  milestone_id: number;
  priority_id: number;
  refs: string;
  section_id: number;
  suite_id: number;
  template_id: number;
  title: string;
  type_id: number;
  updated_by: number;
  updated_on: number;
}

export interface CaseChange {
  type_id: number;
  old_text: string;
  new_text: string;
  label: string;
  options: unknown[];
  field: string;
  old_value: unknown;
  new_value: unknown;
}

export interface CaseHistory {
  id: number;
  created_on: number;
  type_id: number;
  user_id: number;
  changes: CaseChange[];
}

export interface CaseStep {
  content: string;
  expected: string;
}

export interface AddCase {
  title: string;
  template_id?: number;
  type_id?: number;
  priority_id?: number;
  estimate?: string;
  milestone_id?: number;
  refs?: string;
  custom_step_results?: CaseStep[];
  [key: string]: unknown;
}
//#endregion

//#region Case Fields
export interface CaseField {
  configs: CaseFieldConfig[];
  description: string;
  display_order: number;
  id: number;
  entity_id: number;
  label: string;
  name: string;
  system_name: string;
  type_id: FieldType;
  location_id: number;
  is_multi: number;
  is_active: number;
  status_id: number;
  is_system: number;
  include_all: number;
  template_ids: string[];
}

export interface CaseFieldConfig {
  context: Context;
  id: string;
  options: CaseFieldOptions;
}

export interface CaseFieldOptions {
  default_value: string;
  format: string;
  is_required: boolean;
  rows: string;
}

export interface AddCaseField {
  type: string;
  name: string;
  label: string;
  description?: string;
  include_all?: boolean;
  template_ids?: string[];
  configs?: CaseFieldConfig[];
}
//#endregion

//#region Case Types
export interface CaseType {
  id: number;
  is_default: boolean;
  name: string;
}
//#endregion

//#region Configurations
export interface ConfigurationGroup {
  configs: ConfigurationEntry[];
  id: number;
  name: string;
  project_id: number;
}

export interface ConfigurationEntry {
  group_id: number;
  id: number;
  name: string;
}

export interface AddConfiguration {
  name: string;
}
//#endregion

//#region Milestones
export interface Milestone {
  completed_on: number;
  description: string;
  due_on: number;
  id: number;
  is_completed: boolean;
  is_started: boolean;
  milestones: number[];
  name: string;
  parent_id: number;
  project_id: number;
  // TestRail 6.4
  refs: string;
  start_on: number;
  started_on: number;
  url: string;
}

export interface AddMilestone {
  name: string;
  description?: string;
  due_on?: number;
  parent_id?: number;
  refs?: string;
  start_on?: number;
}

export interface UpdateMilestone extends Partial<AddMilestone> {
  is_completed?: boolean;
  is_started?: boolean;
}
//#endregion

//#region Plans
export interface Plan {
  assignedto_id: number;
  blocked_count: number;
  completed_on: number;
  created_by: number;
  created_on: number;
  description: string;
  entries: PlanEntry[];
  failed_count: number;
  id: number;
  is_completed: boolean;
  milestone_id: number;
  name: string;
  passed_count: number;
  project_id: number;
  // TestRail 6.3
  refs: string;
  retest_count: number;
  untested_count: number;
  url: string;
}

export interface AddPlan {
  name: string;
  description?: string;
  milestone_id?: number;
  entries?: AddPlanEntry[];
}

export interface PlanEntry {
  suite_id: number;
  id: string;
  name: string;
  description?: string;
  assignedto_id?: number;
  include_all?: boolean;
  case_ids?: number[];
  config_ids?: number[];
  // TestRail 6.3
  refs: string;
  runs: Run[];
}

export interface AddPlanEntryRun {
  name?: string;
  description?: string;
  assignedto_id?: number;
  include_all?: boolean;
  case_ids?: number[];
  config_ids?: number[];
  refs?: string;
}

export interface AddPlanEntry {
  suite_id: number;
  name: string;
  description?: string;
  assignedto_id?: number;
  include_all?: boolean;
  case_ids?: number[];
  config_ids?: number[];
  runs?: AddPlanEntryRun[];
}

export interface UpdatePlanEntry {
  name?: string;
  description?: string;
  assignedto_id?: number;
  include_all?: boolean;
  case_ids?: number[];
  // TestRail 6.3
  refs?: string;
}
//#endregion

//#region Priorities
export interface Priority {
  id: number;
  is_default: boolean;
  name: string;
  priority: number;
  short_name: string;
}
//#endregion

//#region Project
export interface Project {
  announcement: string;
  completed_on: number;
  id: number;
  is_completed: boolean;
  name: string;
  show_announcement: boolean;
  suite_mode: number;
  url: string;
}

export interface AddProject {
  name: string;
  announcement?: string;
  show_announcement?: boolean;
  suite_mode?: SuiteMode;
}

export interface UpdateProject extends Partial<AddProject> {
  is_completed?: boolean;
}
//#endregion

//#region Reports
export interface Report {
  id: number;
  name: string;
  description: null;
  notify_user: boolean;
  notify_link: boolean;
  notify_link_recipients: null;
  notify_attachment: boolean;
  notify_attachment_recipients: string;
  notify_attachment_html_format: boolean;
  notify_attachment_pdf_format: boolean;
  cases_groupby?: string;
  changes_daterange?: string;
  changes_daterange_from?: null;
  changes_daterange_to?: null;
  suites_include?: string;
  suites_ids?: null;
  sections_include?: string;
  sections_ids?: null;
  cases_columns?: CasesColumns;
  cases_filters?: null;
  cases_limit?: number;
  content_hide_links?: boolean;
  cases_include_new?: boolean;
  cases_include_updated?: boolean;
}

export interface CasesColumns {
  "cases:id": number;
  "cases:title": number;
  "cases:created_by": number;
  "cases:updated_by": number;
}

export interface RunReportResult {
  report_url: string;
  report_html: string;
  report_pdf: string;
}
//#endregion

//#region Results
export interface Result {
  assignedto_id: number;
  comment: string;
  created_by: number;
  created_on: number;
  defects: string;
  elapsed: string;
  id: number;
  status_id: number;
  test_id: number;
  version: string;
  custom_step_results?: ResultStep[];
  [key: string]: unknown;
}

export interface ResultStep {
  content: string;
  expected: string;
  actual: string;
  status_id: number;
}

export interface AddResult {
  status_id?: TestStatus;
  comment?: string;
  version?: string;
  elapsed?: string;
  defects?: string;
  assignedto_id?: number;
  custom_step_results?: ResultStep[];
  [key: string]: unknown;
}

export interface AddMultipleResult extends AddResult {
  test_id: number;
}

export interface AddResultForCase extends AddResult {
  case_id: number;
}

export interface ResultField {
  configs: ResultFieldConfig[];
  description: string;
  display_order: number;
  id: number;
  entity_id: number;
  label: string;
  name: string;
  system_name: string;
  type_id: FieldType;
}

export interface ResultFieldConfig {
  context: Context;
  id: string;
  options: ResultFieldOptions;
}

export interface ResultFieldOptions {
  format: string;
  has_actual: boolean;
  has_expected: boolean;
  is_required: boolean;
}
//#endregion

//#region Runs
export interface Run {
  assignedto_id: number;
  blocked_count: number;
  completed_on: number;
  config: string;
  config_ids: number[];
  created_by: number;
  created_on: number;
  description: string;
  failed_count: number;
  id: number;
  include_all: boolean;
  is_completed: boolean;
  milestone_id: number;
  plan_id: number;
  name: string;
  passed_count: number;
  project_id: number;
  retest_count: number;
  suite_id: number;
  untested_count: number;
  url: string;
  refs: string;
  [key: string]: unknown;
}

export interface AddRun {
  suite_id?: number;
  name: string;
  description?: string;
  milestone_id?: number;
  assignedto_id?: number;
  include_all?: boolean;
  case_ids?: number[];
  refs?: string;
}

export type UpdateRun = Partial<Omit<AddRun, "suite_id" | "assignedto_id">>;
//#endregion

//#region Sections
export interface Section {
  depth: number;
  description: string;
  display_order: number;
  id: number;
  name: string;
  parent_id: number;
  suite_id: number;
}

export interface AddSection {
  name: string;
  description?: string;
  suite_id?: number;
  parent_id?: number;
}

export interface UpdateSection {
  name?: string;
  description?: string;
}
//#endregion

//#region Statuses
export interface Status {
  color_bright: number;
  color_dark: number;
  color_medium: number;
  id: number;
  is_final: boolean;
  is_system: boolean;
  is_untested: boolean;
  label: string;
  name: string;
}

//#endregion

//#region Suites
export interface Suite {
  completed_on: number;
  description: string;
  id: number;
  is_baseline: boolean;
  is_completed: boolean;
  is_master: boolean;
  name: string;
  project_id: number;
  url: string;
}

export interface AddSuite {
  name: string;
  description?: string;
}
//#endregion

//#region Templates
export interface Template {
  id: number;
  is_default: boolean;
  name: string;
}
//#endregion

//#region Tests
export interface Test {
  assignedto_id: number;
  case_id: number;
  estimate: string;
  estimate_forecast: string;
  id: number;
  milestone_id: number;
  priority_id: number;
  refs: string;
  run_id: number;
  status_id: number;
  title: string;
  type_id: number;
  [key: string]: unknown;
}
//#endregion

//#region Users
export interface User {
  email: string;
  id: number;
  is_active: boolean;
  name: string;
  // TestRail 6.4
  role_id: number;
  // TestRail 6.4
  role: string;
}
//#endregion
