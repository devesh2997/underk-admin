import { HTTP_METHODS, baseURL } from ".";

export const EMPLOYEE_GET_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL + "/emp",
};

export const EMPLOYEE_GET_ALL_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL + "/emp/all",
};

export const EMPLOYEE_CREATE_ENDPOINT = {
  method: HTTP_METHODS.POST,
  url: baseURL + "/emp",
};

export const EMPLOYEE_DELETE_ENDPOINT = {
  method: HTTP_METHODS.DELETE,
  url: baseURL + "/emp",
};

export const EMPLOYEE_UPDATE_ENDPOINT = {
  method: HTTP_METHODS.PUT,
  url: baseURL + "/emp",
};
