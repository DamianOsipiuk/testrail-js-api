import type { TestRail } from "./api";
import type { Report, RunReportResult } from "./interfaces";

/**
 * @requires TestRail 5.7
 */
export function getReports(this: TestRail, project_id: number) {
  return this.apiGet<Report[]>("get_reports/" + project_id);
}

/**
 * @requires TestRail 5.7
 */
export function runReport(this: TestRail, report_template_id: number) {
  return this.apiGet<RunReportResult>("run_report/" + report_template_id);
}
