import { HTTP_METHODS, baseURL } from ".";

export const POLICY_GET_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL + "/policy",
};

export const POLICY_GET_ALL_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL + "/policies",
};
