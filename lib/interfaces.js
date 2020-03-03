"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["Get"] = "GET";
    HttpMethod["Post"] = "POST";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var TestStatus;
(function (TestStatus) {
    TestStatus[TestStatus["Passed"] = 1] = "Passed";
    TestStatus[TestStatus["Blocked"] = 2] = "Blocked";
    TestStatus[TestStatus["Untested"] = 3] = "Untested";
    TestStatus[TestStatus["Retest"] = 4] = "Retest";
    TestStatus[TestStatus["Failed"] = 5] = "Failed";
})(TestStatus = exports.TestStatus || (exports.TestStatus = {}));
var FieldType;
(function (FieldType) {
    FieldType[FieldType["String"] = 1] = "String";
    FieldType[FieldType["Integer"] = 2] = "Integer";
    FieldType[FieldType["Text"] = 3] = "Text";
    FieldType[FieldType["URL"] = 4] = "URL";
    FieldType[FieldType["Checkbox"] = 5] = "Checkbox";
    FieldType[FieldType["Dropdown"] = 6] = "Dropdown";
    FieldType[FieldType["User"] = 7] = "User";
    FieldType[FieldType["Date"] = 8] = "Date";
    FieldType[FieldType["Milestone"] = 9] = "Milestone";
    FieldType[FieldType["Steps"] = 10] = "Steps";
    FieldType[FieldType["Multiselect"] = 11] = "Multiselect";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
var SuiteMode;
(function (SuiteMode) {
    SuiteMode[SuiteMode["SingleSuite"] = 1] = "SingleSuite";
    SuiteMode[SuiteMode["SingleSuiteWithBaseline"] = 2] = "SingleSuiteWithBaseline";
    SuiteMode[SuiteMode["MultipleSuites"] = 3] = "MultipleSuites";
})(SuiteMode = exports.SuiteMode || (exports.SuiteMode = {}));
