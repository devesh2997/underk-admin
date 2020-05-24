import { HTTP_METHODS, baseURL } from ".";

export const ROLE_GET_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL + "/role",
};

export const ROLE_GET_ALL_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL + "/roles",
};

export const ROLE_CREATE_ENDPOINT = {
  method: HTTP_METHODS.POST,
  url: baseURL + "/role",
};

export const ROLE_DELETE_ENDPOINT = {
  method: HTTP_METHODS.DELETE,
  url: baseURL + "/role",
};

export const ROLE_ADD_POLICIES_ENDPOINT = {
  method: HTTP_METHODS.POST,
  url: baseURL + "/role/policy",
};

export const ROLE_DELETE_POLICIES_ENDPOINT = {
  method: HTTP_METHODS.DELETE,
  url: baseURL + "/role/policy",
};
