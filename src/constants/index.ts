import * as URLS from "./urls";
import * as EVENTS from "./events";
import * as REPO_CHANGES from "./repo-changes";
import { Method } from "axios";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const HTTP_METHODS = {
  GET: "GET" as Method,
  POST: "POST" as Method,
  PUT: "PUT" as Method,
  DELETE: "DELETE" as Method,
};

export {URLS, EVENTS, REPO_CHANGES};