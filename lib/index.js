"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const querystring_1 = __importDefault(require("querystring"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const form_data_1 = __importDefault(require("form-data"));
const interfaces_1 = require("./interfaces");
class TestRail {
    constructor(host, user, apiKey) {
        this._callAPI = async ({ method, apiUrl, body, options, }) => {
            let requestBody = body;
            if ((options === null || options === void 0 ? void 0 : options.requestType) !== 2) {
                requestBody = JSON.stringify(body);
            }
            let url = this.host + this.baseUrl + apiUrl;
            if (options === null || options === void 0 ? void 0 : options.queryVariables) {
                url += "&" + querystring_1.default.stringify(options.queryVariables);
            }
            const headers = (options === null || options === void 0 ? void 0 : options.headers) ? {
                ...options.headers,
                Authorization: this.authHeader,
            }
                : {
                    "Content-Type": "application/json",
                    Authorization: this.authHeader,
                };
            const response = await node_fetch_1.default(url, {
                method,
                body: requestBody,
                headers,
            });
            const value = await ((options === null || options === void 0 ? void 0 : options.responseType) === 2
                ? response.blob()
                : response.json());
            return {
                response,
                value,
            };
        };
        this.apiGet = (apiUrl, options) => {
            return this._callAPI({
                method: interfaces_1.HttpMethod.Get,
                apiUrl,
                options,
            });
        };
        this.apiPost = (apiUrl, body, options) => {
            return this._callAPI({
                method: interfaces_1.HttpMethod.Post,
                apiUrl,
                body,
                options,
            });
        };
        this.addAttachmentToResult = async (result_id, filePath) => {
            const formData = new form_data_1.default();
            formData.append("attachment", fs_1.default.createReadStream(filePath));
            return this.apiPost("add_attachment_to_result/" + result_id, formData, {
                headers: {},
            });
        };
        this.get_attachments_for_case = async (case_id) => {
            return this.apiGet("get_attachments_for_case/" + case_id);
        };
        this.get_attachments_for_test = async (test_id) => {
            return this.apiGet("get_attachments_for_test/" + test_id);
        };
        this.get_attachment = async (attachment_id) => {
            return this.apiGet("get_attachment/" + attachment_id, {
                responseType: 2,
            });
        };
        this.delete_attachment = async (attachment_id) => {
            return this.apiPost("delete_attachment/" + attachment_id);
        };
        this.getCase = (case_id) => {
            return this.apiGet("get_case/" + case_id);
        };
        this.getCases = (project_id, queryVariables) => {
            return this.apiGet("get_cases/" + project_id, {
                queryVariables,
            });
        };
        this.addCase = (section_id, case_data) => {
            return this.apiPost("add_case/" + section_id, case_data);
        };
        this.updateCase = (case_id, case_data) => {
            return this.apiPost("update_case/" + case_id, case_data);
        };
        this.deleteCase = (case_id) => {
            return this.apiPost("delete_case/" + case_id);
        };
        this.getCaseFields = () => {
            return this.apiGet("get_case_fields");
        };
        this.add_case_field = (case_field) => {
            return this.apiPost("add_case_field", case_field);
        };
        this.getCaseTypes = () => {
            return this.apiGet("get_case_types");
        };
        this.getConfigs = (project_id) => {
            return this.apiGet("get_configs/" + project_id);
        };
        this.addConfigGroup = (project_id, configuration_group) => {
            return this.apiPost("add_config_group/" + project_id, configuration_group);
        };
        this.addConfig = (config_group_id, config) => {
            return this.apiPost("add_config/" + config_group_id, config);
        };
        this.updateConfigGroup = (config_group_id, config) => {
            return this.apiPost("update_config_group/" + config_group_id, config);
        };
        this.updateConfig = (config_id, config) => {
            return this.apiPost("update_config/" + config_id, config);
        };
        this.deleteConfigGroup = (config_group_id) => {
            return this.apiPost("delete_config_group/" + config_group_id);
        };
        this.deleteConfig = (config_id) => {
            return this.apiPost("delete_config/" + config_id);
        };
        this.getMilestone = (milestone_id) => {
            return this.apiGet("get_milestone/" + milestone_id);
        };
        this.getMilestones = (project_id, filters) => {
            return this.apiGet("get_milestones/" + project_id, {
                queryVariables: filters,
            });
        };
        this.addMilestone = (project_id, muilestone) => {
            return this.apiPost("add_milestone/" + project_id, muilestone);
        };
        this.updateMilestone = (milestone_id, muilestone) => {
            return this.apiPost("update_milestone/" + milestone_id, muilestone);
        };
        this.deleteMilestone = (milestone_id) => {
            return this.apiPost("delete_milestone/" + milestone_id);
        };
        this.getPlan = (plan_id) => {
            return this.apiGet("get_plan/" + plan_id);
        };
        this.getPlans = (project_id, filters) => {
            return this.apiGet("get_plans/" + project_id, {
                queryVariables: filters,
            });
        };
        this.addPlan = (project_id, plan) => {
            return this.apiPost("add_plan/" + project_id, plan);
        };
        this.addPlanEntry = (plan_id, data) => {
            return this.apiPost("add_plan_entry/" + plan_id, data);
        };
        this.updatePlan = (plan_id, data) => {
            return this.apiPost("update_plan/" + plan_id, data);
        };
        this.updatePlanEntry = (plan_id, entry_id, data) => {
            return this.apiPost("update_plan_entry/" + plan_id + "/" + entry_id, data);
        };
        this.closePlan = (plan_id) => {
            return this.apiPost("close_plan/" + plan_id);
        };
        this.deletePlan = (plan_id) => {
            return this.apiPost("delete_plan/" + plan_id);
        };
        this.deletePlanEntry = (plan_id, entry_id) => {
            return this.apiPost("delete_plan_entry/" + plan_id + "/" + entry_id);
        };
        this.getPriorities = () => {
            return this.apiGet("get_priorities");
        };
        this.getProject = (project_id) => {
            return this.apiGet("get_project/" + project_id);
        };
        this.getProjects = (filters) => {
            return this.apiGet("get_projects", { queryVariables: filters });
        };
        this.addProject = (data) => {
            return this.apiPost("add_project", data);
        };
        this.updateProject = (project_id, data) => {
            return this.apiPost("update_project/" + project_id, data);
        };
        this.deleteProject = (project_id) => {
            return this.apiPost("delete_project/" + project_id);
        };
        this.getReports = (project_id) => {
            return this.apiGet("get_reports/" + project_id);
        };
        this.runReport = (report_template_id) => {
            return this.apiGet("run_report/" + report_template_id);
        };
        this.getResults = (test_id, filters) => {
            return this.apiGet("get_results/" + test_id, {
                queryVariables: filters,
            });
        };
        this.getResultsForCase = (run_id, case_id, filters) => {
            return this.apiGet("get_results_for_case/" + run_id + "/" + case_id, { queryVariables: filters });
        };
        this.getResultsForRun = (run_id, filters) => {
            return this.apiGet("get_results_for_run/" + run_id, {
                queryVariables: filters,
            });
        };
        this.addResult = (test_id, data) => {
            return this.apiPost("add_result/" + test_id, data);
        };
        this.addResultForCase = (run_id, case_id, data) => {
            return this.apiPost("add_result_for_case/" + run_id + "/" + case_id, data);
        };
        this.addResults = (run_id, results) => {
            return this.apiPost("add_results/" + run_id, {
                results,
            });
        };
        this.addResultsForCases = (run_id, results) => {
            return this.apiPost("add_results_for_cases/" + run_id, {
                results,
            });
        };
        this.getResultFields = () => {
            return this.apiGet("get_result_fields");
        };
        this.getRun = (run_id) => {
            return this.apiGet("get_run/" + run_id);
        };
        this.getRuns = (project_id, filters) => {
            return this.apiGet("get_runs/" + project_id, {
                queryVariables: filters,
            });
        };
        this.addRun = (project_id, data) => {
            return this.apiPost("add_run/" + project_id, data);
        };
        this.updateRun = (run_id, data) => {
            return this.apiPost("update_run/" + run_id, data);
        };
        this.closeRun = (run_id) => {
            return this.apiPost("close_run/" + run_id);
        };
        this.deleteRun = (run_id) => {
            return this.apiPost("delete_run/" + run_id);
        };
        this.getSection = (section_id) => {
            return this.apiGet("get_section/" + section_id);
        };
        this.getSections = (project_id, filters) => {
            return this.apiGet("get_sections/" + project_id, {
                queryVariables: filters,
            });
        };
        this.addSection = (project_id, data) => {
            return this.apiPost("add_section/" + project_id, data);
        };
        this.updateSection = (section_id, data) => {
            return this.apiPost("update_section/" + section_id, data);
        };
        this.deleteSection = (section_id) => {
            return this.apiPost("delete_section/" + section_id);
        };
        this.getStatuses = () => {
            return this.apiGet("get_statuses");
        };
        this.getSuite = (suite_id) => {
            return this.apiGet("get_suite/" + suite_id);
        };
        this.getSuites = (project_id) => {
            return this.apiGet("get_suites/" + project_id);
        };
        this.addSuite = (project_id, data) => {
            return this.apiPost("add_suite/" + project_id, data);
        };
        this.updateSuite = (suite_id, data) => {
            return this.apiPost("update_suite/" + suite_id, data);
        };
        this.deleteSuite = (suite_id) => {
            return this.apiPost("delete_suite/" + suite_id);
        };
        this.getTemplates = (project_id) => {
            return this.apiGet("get_templates/" + project_id);
        };
        this.getTest = (test_id) => {
            return this.apiGet("get_test/" + test_id);
        };
        this.getTests = (run_id, filters) => {
            return this.apiGet("get_tests/" + run_id, {
                queryVariables: filters,
            });
        };
        this.getUser = (user_id) => {
            return this.apiGet("get_user/" + user_id);
        };
        this.getUserByEmail = (email) => {
            return this.apiGet("get_user_by_email", {
                queryVariables: { email },
            });
        };
        this.getUsers = () => {
            return this.apiGet("get_users");
        };
        this.host = host;
        this.baseUrl = "/index.php?/api/v2/";
        this.authHeader =
            "Basic " + Buffer.from(user + ":" + apiKey).toString("base64");
    }
}
exports.TestRail = TestRail;
