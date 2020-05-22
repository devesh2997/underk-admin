import { Method } from "axios";

export const serverURL = "http://localhost:400/v1";
export const adminApp = "/admin";

export const baseURL = serverURL + adminApp

export const HTTP_METHODS = {
    GET: "GET" as Method,
    POST: "POST" as Method,
    PUT: "PUT" as Method,
    DELETE: "DELETE" as Method,
};