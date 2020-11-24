import type { TestRail } from "./api";
import type { User } from "./interfaces";

/**
 * Note: Any user can retrieve his/her own account information. Retrieving information for any other user requires administrator access.
 */
export function getUser(this: TestRail, user_id: number) {
  return this.apiGet<User>("get_user/" + user_id);
}

/**
 * Note: Any user can retrieve his/her own account information. Retrieving information for any other user requires administrator access.
 */
export function getCurrentUser(this: TestRail) {
  return this.apiGet<User>("get_current_user");
}

/**
 * Note: Any user can retrieve his/her own account information. Retrieving information for any other user requires administrator access.
 */
export function getUserByEmail(this: TestRail, email: string) {
  return this.apiGet<User>("get_user_by_email", {
    queryVariables: { email },
  });
}

/**
 * @param projectId The ID of the project for which you would like to retrieve user information. (Required for non-administrators. Requires TestRail 6.4 or later.)
 */
export function getUsers(this: TestRail, project_id?: string) {
  return this.apiGet<User[]>("get_users", {
    queryVariables: { project_id },
  });
}
