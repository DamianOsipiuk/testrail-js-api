import qs from "querystring";
import fetch, { Response } from "node-fetch";

import {
  addAttachmentToPlan,
  addAttachmentToPlanEntry,
  addAttachmentToResult,
  delete_attachment,
  get_attachment,
  get_attachments_for_case,
  get_attachments_for_plan,
  get_attachments_for_plan_entry,
  get_attachments_for_run,
  get_attachments_for_test,
} from "./attachments";
import {
  addCase,
  deleteCase,
  deleteCases,
  getCase,
  getCases,
  getHistoryForCase,
  updateCase,
  updateCases,
} from "./cases";
import { add_case_field, getCaseFields } from "./case_fields";
import { getCaseTypes } from "./case_types";
import {
  addConfig,
  addConfigGroup,
  deleteConfig,
  deleteConfigGroup,
  getConfigs,
  updateConfig,
  updateConfigGroup,
} from "./configurations";
import {
  addMilestone,
  deleteMilestone,
  getMilestone,
  getMilestones,
  updateMilestone,
} from "./milestones";
import {
  addPlan,
  addPlanEntry,
  addRunToPlanEntry,
  closePlan,
  deletePlan,
  deletePlanEntry,
  deleteRunFromPlanEntry,
  getPlan,
  getPlans,
  updatePlan,
  updatePlanEntry,
  updateRunInPlanEntry,
} from "./plans";
import { getPriorities } from "./priorities";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "./projects";
import { getReports, runReport } from "./reports";
import {
  addResult,
  addResultForCase,
  addResults,
  addResultsForCases,
  getResults,
  getResultsForCase,
  getResultsForRun,
} from "./results";
import { getResultFields } from "./result_fields";
import {
  addRun,
  closeRun,
  deleteRun,
  getRun,
  getRuns,
  updateRun,
} from "./runs";
import {
  addSection,
  deleteSection,
  getSection,
  getSections,
  updateSection,
} from "./sections";
import { getStatuses } from "./statuses";
import {
  addSuite,
  deleteSuite,
  getSuite,
  getSuites,
  updateSuite,
} from "./suites";
import { getTemplates } from "./templates";
import { getTest, getTests } from "./tests";
import { getUser, getCurrentUser, getUserByEmail, getUsers } from "./users";

import { HttpMethod, RequestType, RequestOptions } from "./interfaces";

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
    if (options?.requestType !== RequestType.Blob) {
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
    } else if (options?.requestType !== RequestType.Blob) {
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

    const contentType = response.headers.get("Content-Type");
    const contentLength = Number(response.headers.get("Content-Length"));
    let value;

    if (contentLength > 0) {
      if (contentType?.includes("application/json")) {
        value = await response.json();
      } else if (contentType?.includes("text/plain")) {
        value = await response.text();
      } else {
        value = await response.blob();
      }
    }

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
  addAttachmentToPlan = addAttachmentToPlan;
  addAttachmentToPlanEntry = addAttachmentToPlanEntry;
  addAttachmentToResult = addAttachmentToResult;
  get_attachments_for_case = get_attachments_for_case;
  get_attachments_for_plan = get_attachments_for_plan;
  get_attachments_for_plan_entry = get_attachments_for_plan_entry;
  get_attachments_for_run = get_attachments_for_run;
  get_attachments_for_test = get_attachments_for_test;
  get_attachment = get_attachment;
  delete_attachment = delete_attachment;
  //#endregion

  //#region Cases
  getCase = getCase;
  getCases = getCases;
  getHistoryForCase = getHistoryForCase;
  addCase = addCase;
  updateCase = updateCase;
  updateCases = updateCases;
  deleteCase = deleteCase;
  deleteCases = deleteCases;
  //#endregion

  //#region Case Fields
  getCaseFields = getCaseFields;
  add_case_field = add_case_field;
  //#endregion

  //#region Case Types
  getCaseTypes = getCaseTypes;
  //#endregion

  //#region Configurations
  getConfigs = getConfigs;
  addConfigGroup = addConfigGroup;
  addConfig = addConfig;
  updateConfigGroup = updateConfigGroup;
  updateConfig = updateConfig;
  deleteConfigGroup = deleteConfigGroup;
  deleteConfig = deleteConfig;
  //#endregion

  //#region Milestones
  getMilestone = getMilestone;
  getMilestones = getMilestones;
  addMilestone = addMilestone;
  updateMilestone = updateMilestone;
  deleteMilestone = deleteMilestone;
  //#endregion

  //#region Plans
  getPlan = getPlan;
  getPlans = getPlans;
  addPlan = addPlan;
  addPlanEntry = addPlanEntry;
  addRunToPlanEntry = addRunToPlanEntry;
  updatePlan = updatePlan;
  updatePlanEntry = updatePlanEntry;
  updateRunInPlanEntry = updateRunInPlanEntry;
  closePlan = closePlan;
  deletePlan = deletePlan;
  deletePlanEntry = deletePlanEntry;
  deleteRunFromPlanEntry = deleteRunFromPlanEntry;
  //#endregion

  //#region Priorities
  getPriorities = getPriorities;
  //#endregion

  //#region Projects
  getProject = getProject;
  getProjects = getProjects;
  addProject = addProject;
  updateProject = updateProject;
  deleteProject = deleteProject;
  //#endregion

  //#region Reports
  getReports = getReports;
  runReport = runReport;
  //#endregion

  //#region Results
  getResults = getResults;
  getResultsForCase = getResultsForCase;
  getResultsForRun = getResultsForRun;
  addResult = addResult;
  addResultForCase = addResultForCase;
  addResults = addResults;
  addResultsForCases = addResultsForCases;
  getResultFields = getResultFields;
  //#endregion

  //#region Runs
  getRun = getRun;
  getRuns = getRuns;
  addRun = addRun;
  updateRun = updateRun;
  closeRun = closeRun;
  deleteRun = deleteRun;
  //#endregion

  //#region Sections
  getSection = getSection;
  getSections = getSections;
  addSection = addSection;
  updateSection = updateSection;
  deleteSection = deleteSection;
  //#endregion

  //#region Statuses
  getStatuses = getStatuses;
  //#endregion

  //#region Suites
  getSuite = getSuite;
  getSuites = getSuites;
  addSuite = addSuite;
  updateSuite = updateSuite;
  deleteSuite = deleteSuite;
  //#endregion

  //#region Templates
  getTemplates = getTemplates;
  //#endregion

  //#region Tests
  getTest = getTest;
  getTests = getTests;
  //#endregion

  //#region Users
  getUser = getUser;
  getCurrentUser = getCurrentUser;
  getUserByEmail = getUserByEmail;
  getUsers = getUsers;
  //#endregion
}
