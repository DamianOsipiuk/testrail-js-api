import fs from "fs";
import FormData from "form-data";
import { RequestType } from "./interfaces";

import type { TestRail } from "./api";
import type {
  AddAttachmentResult,
  Attachment,
  BulkFilters,
  BulkResult,
} from "./interfaces";

export function addAttachmentToCase(
  this: TestRail,
  case_id: number,
  filePath: string
) {
  const formData = new FormData();
  formData.append("attachment", fs.createReadStream(filePath));

  return this.apiPost<AddAttachmentResult>(
    "add_attachment_to_case/" + case_id,
    formData,
    {
      headers: {},
      requestType: RequestType.Blob,
    }
  );
}

export function addAttachmentToPlan(
  this: TestRail,
  plan_id: number,
  filePath: string
) {
  const formData = new FormData();
  formData.append("attachment", fs.createReadStream(filePath));

  return this.apiPost<AddAttachmentResult>(
    "add_attachment_to_plan/" + plan_id,
    formData,
    {
      headers: {},
      requestType: RequestType.Blob,
    }
  );
}

export function addAttachmentToPlanEntry(
  this: TestRail,
  plan_id: number,
  entry_id: number,
  filePath: string
) {
  const formData = new FormData();
  formData.append("attachment", fs.createReadStream(filePath));

  return this.apiPost<AddAttachmentResult>(
    "add_attachment_to_plan_entry/" + plan_id + "/" + entry_id,
    formData,
    {
      headers: {},
      requestType: RequestType.Blob,
    }
  );
}

/**
 * Please Note: The ability to edit test results must be enabled under ‘Site Settings’ in order for add_attachment_to_result endpoints to work.
 */
export function addAttachmentToResult(
  this: TestRail,
  result_id: number,
  filePath: string
) {
  const formData = new FormData();
  formData.append("attachment", fs.createReadStream(filePath));

  return this.apiPost<AddAttachmentResult>(
    "add_attachment_to_result/" + result_id,
    formData,
    {
      headers: {},
      requestType: RequestType.Blob,
    }
  );
}

export function addAttachmentToRun(
  this: TestRail,
  run_id: number,
  filePath: string
) {
  const formData = new FormData();
  formData.append("attachment", fs.createReadStream(filePath));

  return this.apiPost<AddAttachmentResult>(
    "add_attachment_to_run/" + run_id,
    formData,
    {
      headers: {},
      requestType: RequestType.Blob,
    }
  );
}

export function get_attachments_for_case(
  this: TestRail,
  case_id: number,
  queryVariables?: BulkFilters
) {
  return this.apiGet<BulkResult<Attachment, "attachments">>(
    "get_attachments_for_case/" + case_id,
    { queryVariables }
  );
}

export function get_attachments_for_plan(
  this: TestRail,
  plan_id: number,
  queryVariables?: BulkFilters
) {
  return this.apiGet<BulkResult<Attachment, "attachments">>(
    "get_attachments_for_plan/" + plan_id,
    { queryVariables }
  );
}

export function get_attachments_for_plan_entry(
  this: TestRail,
  plan_id: number,
  entry_id: number,
  queryVariables?: BulkFilters
) {
  return this.apiGet<BulkResult<Attachment, "attachments">>(
    "get_attachments_for_plan_entry/" + plan_id + "/" + entry_id,
    { queryVariables }
  );
}

export function get_attachments_for_run(
  this: TestRail,
  run_id: number,
  queryVariables?: BulkFilters
) {
  return this.apiGet<BulkResult<Attachment, "attachments">>(
    "get_attachments_for_run/" + run_id,
    { queryVariables }
  );
}

export function get_attachments_for_test(
  this: TestRail,
  test_id: number,
  queryVariables?: BulkFilters
) {
  return this.apiGet<BulkResult<Attachment, "attachments">>(
    "get_attachments_for_test/" + test_id,
    { queryVariables }
  );
}

export function get_attachment(this: TestRail, attachment_id: number) {
  return this.apiGet<Blob>("get_attachment/" + attachment_id);
}

export function delete_attachment(this: TestRail, attachment_id: number) {
  return this.apiPost("delete_attachment/" + attachment_id);
}
