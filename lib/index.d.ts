import { Response } from "node-fetch";
import { HttpMethod, RequestOptions, Attachment, AddAttachmentResult, Case, AddCase, CaseField, AddCaseField, CaseType, ConfigurationGroup, ConfigurationEntry, AddConfiguration, Milestone, AddMilestone, UpdateMilestone, Plan, AddPlan, PlanEntry, AddPlanEntry, UpdatePlanEntry, Priority, Project, AddProject, UpdateProject, Report, RunReportResult, Result, AddResult, AddResultForCase, ResultField, Run, AddRun, Section, AddSection, UpdateSection, Status, Suite, AddSuite, Template, Test, User } from "./interfaces";
export declare class TestRail {
    host: string;
    baseUrl: string;
    authHeader: string;
    constructor(host: string, user: string, apiKey: string);
    _callAPI: <T>({ method, apiUrl, body, options, }: {
        method: HttpMethod;
        apiUrl: string;
        body?: any;
        options?: RequestOptions | undefined;
    }) => Promise<{
        response: Response;
        value: T;
    }>;
    apiGet: <T>(apiUrl: string, options?: RequestOptions | undefined) => Promise<{
        response: Response;
        value: T;
    }>;
    apiPost: <T>(apiUrl: string, body?: any, options?: RequestOptions | undefined) => Promise<{
        response: Response;
        value: T;
    }>;
    addAttachmentToResult: (result_id: number, filePath: string) => Promise<{
        response: Response;
        value: AddAttachmentResult;
    }>;
    get_attachments_for_case: (case_id: number) => Promise<{
        response: Response;
        value: Attachment[];
    }>;
    get_attachments_for_test: (test_id: number) => Promise<{
        response: Response;
        value: Attachment[];
    }>;
    get_attachment: (attachment_id: number) => Promise<{
        response: Response;
        value: Blob;
    }>;
    delete_attachment: (attachment_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getCase: (case_id: number) => Promise<{
        response: Response;
        value: Case;
    }>;
    getCases: (project_id: number, queryVariables?: {
        suite_id: number;
        section_id?: number | undefined;
        limit?: number | undefined;
        offset?: number | undefined;
        filter?: string | undefined;
    } | undefined) => Promise<{
        response: Response;
        value: Case[];
    }>;
    addCase: (section_id: number, case_data: AddCase) => Promise<{
        response: Response;
        value: Case;
    }>;
    updateCase: (case_id: number, case_data: AddCase) => Promise<{
        response: Response;
        value: Case;
    }>;
    deleteCase: (case_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getCaseFields: () => Promise<{
        response: Response;
        value: CaseField[];
    }>;
    add_case_field: (case_field: AddCaseField) => Promise<{
        response: Response;
        value: CaseField;
    }>;
    getCaseTypes: () => Promise<{
        response: Response;
        value: CaseType;
    }>;
    getConfigs: (project_id: number) => Promise<{
        response: Response;
        value: ConfigurationGroup[];
    }>;
    addConfigGroup: (project_id: number, configuration_group: AddConfiguration) => Promise<{
        response: Response;
        value: ConfigurationGroup;
    }>;
    addConfig: (config_group_id: number, config: AddConfiguration) => Promise<{
        response: Response;
        value: ConfigurationEntry;
    }>;
    updateConfigGroup: (config_group_id: number, config: AddConfiguration) => Promise<{
        response: Response;
        value: ConfigurationGroup;
    }>;
    updateConfig: (config_id: number, config: AddConfiguration) => Promise<{
        response: Response;
        value: ConfigurationEntry;
    }>;
    deleteConfigGroup: (config_group_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    deleteConfig: (config_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getMilestone: (milestone_id: number) => Promise<{
        response: Response;
        value: Milestone;
    }>;
    getMilestones: (project_id: number, filters?: {
        is_completed?: boolean | undefined;
        is_started?: boolean | undefined;
    } | undefined) => Promise<{
        response: Response;
        value: Milestone[];
    }>;
    addMilestone: (project_id: number, muilestone: AddMilestone) => Promise<{
        response: Response;
        value: Milestone;
    }>;
    updateMilestone: (milestone_id: number, muilestone: UpdateMilestone) => Promise<{
        response: Response;
        value: Milestone;
    }>;
    deleteMilestone: (milestone_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getPlan: (plan_id: number) => Promise<{
        response: Response;
        value: Plan;
    }>;
    getPlans: (project_id: number, filters?: {
        created_after: number;
        created_before: number;
        created_by: number[];
        is_completed: boolean;
        limit: number;
        offset: number;
        milestone_id: number[];
    } | undefined) => Promise<{
        response: Response;
        value: Plan[];
    }>;
    addPlan: (project_id: number, plan: AddPlan) => Promise<{
        response: Response;
        value: Plan;
    }>;
    addPlanEntry: (plan_id: number, data: AddPlanEntry) => Promise<{
        response: Response;
        value: PlanEntry;
    }>;
    updatePlan: (plan_id: number, data: AddPlan) => Promise<{
        response: Response;
        value: Plan;
    }>;
    updatePlanEntry: (plan_id: number, entry_id: number, data: UpdatePlanEntry) => Promise<{
        response: Response;
        value: PlanEntry;
    }>;
    closePlan: (plan_id: number) => Promise<{
        response: Response;
        value: Plan;
    }>;
    deletePlan: (plan_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    deletePlanEntry: (plan_id: number, entry_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getPriorities: () => Promise<{
        response: Response;
        value: Priority;
    }>;
    getProject: (project_id: number) => Promise<{
        response: Response;
        value: Project;
    }>;
    getProjects: (filters?: {
        is_completed?: boolean | undefined;
    } | undefined) => Promise<{
        response: Response;
        value: Project[];
    }>;
    addProject: (data: AddProject) => Promise<{
        response: Response;
        value: Project;
    }>;
    updateProject: (project_id: number, data: UpdateProject) => Promise<{
        response: Response;
        value: Project;
    }>;
    deleteProject: (project_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getReports: (project_id: number) => Promise<{
        response: Response;
        value: Report[];
    }>;
    runReport: (report_template_id: number) => Promise<{
        response: Response;
        value: RunReportResult;
    }>;
    getResults: (test_id: number, filters?: {
        limit: number;
        offset: number;
        status_id: number[];
    } | undefined) => Promise<{
        response: Response;
        value: Result[];
    }>;
    getResultsForCase: (run_id: number, case_id: number, filters?: {
        limit?: number | undefined;
        offset?: number | undefined;
        status_id?: number[] | undefined;
    } | undefined) => Promise<{
        response: Response;
        value: Result[];
    }>;
    getResultsForRun: (run_id: number, filters?: {
        created_after: number;
        created_before: number;
        created_by: number[];
        limit: number;
        offset: number;
        status_id: number[];
    } | undefined) => Promise<{
        response: Response;
        value: Result[];
    }>;
    addResult: (test_id: number, data: AddResult) => Promise<{
        response: Response;
        value: Result;
    }>;
    addResultForCase: (run_id: number, case_id: number, data: AddResult) => Promise<{
        response: Response;
        value: Result;
    }>;
    addResults: (run_id: number, results: AddResult[]) => Promise<{
        response: Response;
        value: Result[];
    }>;
    addResultsForCases: (run_id: number, results: AddResultForCase[]) => Promise<{
        response: Response;
        value: Result[];
    }>;
    getResultFields: () => Promise<{
        response: Response;
        value: ResultField[];
    }>;
    getRun: (run_id: number) => Promise<{
        response: Response;
        value: Run;
    }>;
    getRuns: (project_id: number, filters?: {
        created_after: number;
        created_before: number;
        created_by: number[];
        is_completed: boolean;
        limit: number;
        offset: number;
        milestone_id: number[];
        suite_id: number[];
    } | undefined) => Promise<{
        response: Response;
        value: Run[];
    }>;
    addRun: (project_id: number, data: AddRun) => Promise<{
        response: Response;
        value: Run;
    }>;
    updateRun: (run_id: number, data: Pick<AddRun, "name" | "description" | "milestone_id" | "include_all" | "case_ids" | "refs">) => Promise<{
        response: Response;
        value: Run;
    }>;
    closeRun: (run_id: number) => Promise<{
        response: Response;
        value: Run;
    }>;
    deleteRun: (run_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getSection: (section_id: number) => Promise<{
        response: Response;
        value: Section;
    }>;
    getSections: (project_id: number, filters?: {
        suite_id: number;
    } | undefined) => Promise<{
        response: Response;
        value: Section[];
    }>;
    addSection: (project_id: number, data: AddSection) => Promise<{
        response: Response;
        value: Section;
    }>;
    updateSection: (section_id: number, data: UpdateSection) => Promise<{
        response: Response;
        value: Section;
    }>;
    deleteSection: (section_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getStatuses: () => Promise<{
        response: Response;
        value: Status[];
    }>;
    getSuite: (suite_id: number) => Promise<{
        response: Response;
        value: Suite;
    }>;
    getSuites: (project_id: number) => Promise<{
        response: Response;
        value: Suite[];
    }>;
    addSuite: (project_id: number, data: AddSuite) => Promise<{
        response: Response;
        value: Suite;
    }>;
    updateSuite: (suite_id: number, data: AddSuite) => Promise<{
        response: Response;
        value: Suite;
    }>;
    deleteSuite: (suite_id: number) => Promise<{
        response: Response;
        value: unknown;
    }>;
    getTemplates: (project_id: number) => Promise<{
        response: Response;
        value: Template;
    }>;
    getTest: (test_id: number) => Promise<{
        response: Response;
        value: Test;
    }>;
    getTests: (run_id: number, filters?: {
        status_id?: number[] | undefined;
    } | undefined) => Promise<{
        response: Response;
        value: Test[];
    }>;
    getUser: (user_id: number) => Promise<{
        response: Response;
        value: User;
    }>;
    getUserByEmail: (email: string) => Promise<{
        response: Response;
        value: User;
    }>;
    getUsers: () => Promise<{
        response: Response;
        value: User[];
    }>;
}
