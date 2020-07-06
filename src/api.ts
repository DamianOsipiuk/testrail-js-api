// API reference: http://docs.gurock.com/testrail-api2/start

import fs from "fs";
import qs from "querystring";
import fetch, { Response } from "node-fetch";
import FormData from "form-data";

import {
  HttpMethod,
  ResponseType,
  RequestOptions,
  Attachment,
  AddAttachmentResult,
  Case,
  AddCase,
  CaseField,
  AddCaseField,
  CaseType,
  ConfigurationGroup,
  ConfigurationEntry,
  AddConfiguration,
  Milestone,
  AddMilestone,
  UpdateMilestone,
  Plan,
  AddPlan,
  PlanEntry,
  AddPlanEntry,
  UpdatePlanEntry,
  Priority,
  Project,
  AddProject,
  UpdateProject,
  Report,
  RunReportResult,
  Result,
  AddResult,
  AddResultForCase,
  ResultField,
  Run,
  AddRun,
  UpdateRun,
  Section,
  AddSection,
  UpdateSection,
  Status,
  Suite,
  AddSuite,
  Template,
  Test,
  User,
} from "./interfaces";

export class TestRail {
  host: string;
  baseUrl: string;
  authHeader: string;

  /**
   * @param host Hostname of the TestRail server
   * @param user Username used for TestRail connection
   * @param apiKey Generated API key for the user
   * @param baseUrl Base url of the API
   */
  constructor(
    host: string,
    user: string,
    apiKey: string,
    baseUrl: string = "/index.php?/api/v2/"
  ) {
    this.host = host;
    this.baseUrl = baseUrl;
    this.authHeader =
      "Basic " + Buffer.from(user + ":" + apiKey).toString("base64");
  }

  //#region API
  _callAPI = async <T>({
    method,
    apiUrl,
    body,
    options,
  }: {
    method: HttpMethod;
    apiUrl: string;
    body?: any;
    options?: RequestOptions;
  }): Promise<{
    response: Response;
    value: T;
  }> => {
    let requestBody = body;
    if (options?.requestType !== ResponseType.Blob) {
      requestBody = JSON.stringify(body);
    }

    let url = this.host + this.baseUrl + apiUrl;

    if (options?.queryVariables) {
      url += "&" + qs.stringify(options.queryVariables);
    }

    let headers: any = {
      Authorization: this.authHeader,
    };

    if (options?.headers) {
      headers = {
        ...headers,
        ...options.headers,
      };
    } else if (options?.requestType !== ResponseType.Blob) {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(url, {
      method,
      body: requestBody,
      headers,
    });

    const value = await (options?.responseType === ResponseType.Blob
      ? response.blob()
      : response.json());

    return {
      response,
      value,
    };
  };

  apiGet = <T>(apiUrl: string, options?: RequestOptions) => {
    return this._callAPI<T>({
      method: HttpMethod.Get,
      apiUrl,
      options,
    });
  };

  apiPost = <T>(apiUrl: string, body?: any, options?: RequestOptions) => {
    return this._callAPI<T>({
      method: HttpMethod.Post,
      apiUrl,
      body,
      options,
    });
  };
  //#endregion

  //#region Attachments
  addAttachmentToResult = async (result_id: number, filePath: string) => {
    const formData = new FormData();
    formData.append("attachment", fs.createReadStream(filePath));

    return this.apiPost<AddAttachmentResult>(
      "add_attachment_to_result/" + result_id,
      formData,
      {
        headers: {},
        requestType: ResponseType.Blob,
      }
    );
  };

  get_attachments_for_case = async (case_id: number) => {
    return this.apiGet<Attachment[]>("get_attachments_for_case/" + case_id);
  };

  get_attachments_for_test = async (test_id: number) => {
    return this.apiGet<Attachment[]>("get_attachments_for_test/" + test_id);
  };

  get_attachment = async (attachment_id: number) => {
    return this.apiGet<Blob>("get_attachment/" + attachment_id, {
      responseType: ResponseType.Blob,
    });
  };

  delete_attachment = async (attachment_id: number) => {
    return this.apiPost("delete_attachment/" + attachment_id);
  };
  //#endregion

  //#region Cases
  getCase = (case_id: number) => {
    return this.apiGet<Case>("get_case/" + case_id);
  };

  getCases = (
    project_id: number,
    queryVariables?: {
      suite_id: number;
      section_id?: number;
      limit?: number;
      offset?: number;
      filter?: string;
    }
  ) => {
    return this.apiGet<Case[]>("get_cases/" + project_id, {
      queryVariables,
    });
  };

  addCase = (section_id: number, case_data: AddCase) => {
    return this.apiPost<Case>("add_case/" + section_id, case_data);
  };

  updateCase = (case_id: number, case_data: AddCase) => {
    return this.apiPost<Case>("update_case/" + case_id, case_data);
  };

  deleteCase = (case_id: number) => {
    return this.apiPost("delete_case/" + case_id);
  };
  //#endregion

  //#region Case Fields
  getCaseFields = () => {
    return this.apiGet<CaseField[]>("get_case_fields");
  };

  add_case_field = (case_field: AddCaseField) => {
    return this.apiPost<CaseField>("add_case_field", case_field);
  };
  //#endregion

  //#region Case Types
  getCaseTypes = () => {
    return this.apiGet<CaseType>("get_case_types");
  };
  //#endregion

  //#region Configurations
  getConfigs = (project_id: number) => {
    return this.apiGet<ConfigurationGroup[]>("get_configs/" + project_id);
  };

  addConfigGroup = (
    project_id: number,
    configuration_group: AddConfiguration
  ) => {
    return this.apiPost<ConfigurationGroup>(
      "add_config_group/" + project_id,
      configuration_group
    );
  };

  addConfig = (config_group_id: number, config: AddConfiguration) => {
    return this.apiPost<ConfigurationEntry>(
      "add_config/" + config_group_id,
      config
    );
  };

  updateConfigGroup = (config_group_id: number, config: AddConfiguration) => {
    return this.apiPost<ConfigurationGroup>(
      "update_config_group/" + config_group_id,
      config
    );
  };

  updateConfig = (config_id: number, config: AddConfiguration) => {
    return this.apiPost<ConfigurationEntry>(
      "update_config/" + config_id,
      config
    );
  };

  deleteConfigGroup = (config_group_id: number) => {
    return this.apiPost("delete_config_group/" + config_group_id);
  };

  deleteConfig = (config_id: number) => {
    return this.apiPost("delete_config/" + config_id);
  };
  //#endregion

  //#region Milestones
  getMilestone = (milestone_id: number) => {
    return this.apiGet<Milestone>("get_milestone/" + milestone_id);
  };

  getMilestones = (
    project_id: number,
    filters?: {
      is_completed?: 0 | 1;
      is_started?: boolean;
    }
  ) => {
    return this.apiGet<Milestone[]>("get_milestones/" + project_id, {
      queryVariables: filters,
    });
  };

  addMilestone = (project_id: number, muilestone: AddMilestone) => {
    return this.apiPost<Milestone>("add_milestone/" + project_id, muilestone);
  };

  updateMilestone = (milestone_id: number, muilestone: UpdateMilestone) => {
    return this.apiPost<Milestone>(
      "update_milestone/" + milestone_id,
      muilestone
    );
  };

  deleteMilestone = (milestone_id: number) => {
    return this.apiPost("delete_milestone/" + milestone_id);
  };
  //#endregion

  //#region Plans
  getPlan = (plan_id: number) => {
    return this.apiGet<Plan>("get_plan/" + plan_id);
  };

  getPlans = (
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
  ) => {
    return this.apiGet<Plan[]>("get_plans/" + project_id, {
      queryVariables: filters,
    });
  };

  addPlan = (project_id: number, plan: AddPlan) => {
    return this.apiPost<Plan>("add_plan/" + project_id, plan);
  };

  addPlanEntry = (plan_id: number, data: AddPlanEntry) => {
    return this.apiPost<PlanEntry>("add_plan_entry/" + plan_id, data);
  };

  updatePlan = (plan_id: number, data: AddPlan) => {
    return this.apiPost<Plan>("update_plan/" + plan_id, data);
  };

  updatePlanEntry = (
    plan_id: number,
    entry_id: number,
    data: UpdatePlanEntry
  ) => {
    return this.apiPost<PlanEntry>(
      "update_plan_entry/" + plan_id + "/" + entry_id,
      data
    );
  };

  closePlan = (plan_id: number) => {
    return this.apiPost<Plan>("close_plan/" + plan_id);
  };

  deletePlan = (plan_id: number) => {
    return this.apiPost("delete_plan/" + plan_id);
  };

  deletePlanEntry = (plan_id: number, entry_id: number) => {
    return this.apiPost("delete_plan_entry/" + plan_id + "/" + entry_id);
  };
  //#endregion

  //#region Priorities
  getPriorities = () => {
    return this.apiGet<Priority>("get_priorities");
  };
  //#endregion

  //#region Projects
  getProject = (project_id: number) => {
    return this.apiGet<Project>("get_project/" + project_id);
  };

  getProjects = (filters?: { is_completed?: boolean }) => {
    return this.apiGet<Project[]>("get_projects", { queryVariables: filters });
  };

  addProject = (data: AddProject) => {
    return this.apiPost<Project>("add_project", data);
  };

  updateProject = (project_id: number, data: UpdateProject) => {
    return this.apiPost<Project>("update_project/" + project_id, data);
  };

  deleteProject = (project_id: number) => {
    return this.apiPost("delete_project/" + project_id);
  };
  //#endregion

  //#region Reports
  getReports = (project_id: number) => {
    return this.apiGet<Report[]>("get_reports/" + project_id);
  };

  runReport = (report_template_id: number) => {
    return this.apiGet<RunReportResult>("run_report/" + report_template_id);
  };
  //#endregion

  //#region Results
  getResults = (
    test_id: number,
    filters?: {
      limit?: number;
      offset?: number;
      status_id?: number[];
    }
  ) => {
    return this.apiGet<Result[]>("get_results/" + test_id, {
      queryVariables: filters,
    });
  };

  getResultsForCase = (
    run_id: number,
    case_id: number,
    filters?: {
      limit?: number;
      offset?: number;
      status_id?: number[];
    }
  ) => {
    return this.apiGet<Result[]>(
      "get_results_for_case/" + run_id + "/" + case_id,
      { queryVariables: filters }
    );
  };

  getResultsForRun = (
    run_id: number,
    filters?: {
      created_after?: number;
      created_before?: number;
      created_by?: number[];
      limit?: number;
      offset?: number;
      status_id?: number[];
    }
  ) => {
    return this.apiGet<Result[]>("get_results_for_run/" + run_id, {
      queryVariables: filters,
    });
  };

  addResult = (test_id: number, data: AddResult) => {
    return this.apiPost<Result>("add_result/" + test_id, data);
  };

  addResultForCase = (run_id: number, case_id: number, data: AddResult) => {
    return this.apiPost<Result>(
      "add_result_for_case/" + run_id + "/" + case_id,
      data
    );
  };

  addResults = (run_id: number, results: AddResult[]) => {
    return this.apiPost<Result[]>("add_results/" + run_id, {
      results,
    });
  };

  addResultsForCases = (run_id: number, results: AddResultForCase[]) => {
    return this.apiPost<Result[]>("add_results_for_cases/" + run_id, {
      results,
    });
  };

  getResultFields = () => {
    return this.apiGet<ResultField[]>("get_result_fields");
  };
  //#endregion

  //#region Runs
  getRun = (run_id: number) => {
    return this.apiGet<Run>("get_run/" + run_id);
  };

  getRuns = (
    project_id: number,
    filters?: {
      created_after?: number;
      created_before?: number;
      created_by?: number[];
      is_completed?: 0 | 1;
      limit?: number;
      offset?: number;
      milestone_id?: number[];
      suite_id?: number[];
    }
  ) => {
    return this.apiGet<Run[]>("get_runs/" + project_id, {
      queryVariables: filters,
    });
  };

  addRun = (project_id: number, data: AddRun) => {
    return this.apiPost<Run>("add_run/" + project_id, data);
  };

  updateRun = (run_id: number, data: UpdateRun) => {
    return this.apiPost<Run>("update_run/" + run_id, data);
  };

  closeRun = (run_id: number) => {
    return this.apiPost<Run>("close_run/" + run_id);
  };

  deleteRun = (run_id: number) => {
    return this.apiPost("delete_run/" + run_id);
  };
  //#endregion

  //#region Sections
  getSection = (section_id: number) => {
    return this.apiGet<Section>("get_section/" + section_id);
  };

  getSections = (
    project_id: number,
    filters?: {
      suite_id: number;
    }
  ) => {
    return this.apiGet<Section[]>("get_sections/" + project_id, {
      queryVariables: filters,
    });
  };

  addSection = (project_id: number, data: AddSection) => {
    return this.apiPost<Section>("add_section/" + project_id, data);
  };

  updateSection = (section_id: number, data: UpdateSection) => {
    return this.apiPost<Section>("update_section/" + section_id, data);
  };

  deleteSection = (section_id: number) => {
    return this.apiPost("delete_section/" + section_id);
  };
  //#endregion

  //#region Statuses
  getStatuses = () => {
    return this.apiGet<Status[]>("get_statuses");
  };
  //#endregion

  //#region Suites
  getSuite = (suite_id: number) => {
    return this.apiGet<Suite>("get_suite/" + suite_id);
  };

  getSuites = (project_id: number) => {
    return this.apiGet<Suite[]>("get_suites/" + project_id);
  };

  addSuite = (project_id: number, data: AddSuite) => {
    return this.apiPost<Suite>("add_suite/" + project_id, data);
  };

  updateSuite = (suite_id: number, data: AddSuite) => {
    return this.apiPost<Suite>("update_suite/" + suite_id, data);
  };

  deleteSuite = (suite_id: number) => {
    return this.apiPost("delete_suite/" + suite_id);
  };
  //#endregion

  //#region Templates
  getTemplates = (project_id: number) => {
    return this.apiGet<Template>("get_templates/" + project_id);
  };
  //#endregion

  //#region Tests
  getTest = (test_id: number) => {
    return this.apiGet<Test>("get_test/" + test_id);
  };

  getTests = (
    run_id: number,
    filters?: {
      status_id?: number[];
    }
  ) => {
    return this.apiGet<Test[]>("get_tests/" + run_id, {
      queryVariables: filters,
    });
  };
  //#endregion

  //#region Users
  getUser = (user_id: number) => {
    return this.apiGet<User>("get_user/" + user_id);
  };

  getUserByEmail = (email: string) => {
    return this.apiGet<User>("get_user_by_email", {
      queryVariables: { email },
    });
  };

  getUsers = () => {
    return this.apiGet<User[]>("get_users");
  };
  //#endregion
}
