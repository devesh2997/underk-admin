import { HTTP_METHODS, baseURL } from ".";

export const ADMIN_GET_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL,
};

export const ADMIN_GET_ALL_ENDPOINT = {
  method: HTTP_METHODS.GET,
  url: baseURL + "/all",
};

export const ADMIN_CREATE_ENDPOINT = {
  method: HTTP_METHODS.POST,
  url: baseURL,
};

export const ADMIN_DELETE_ENDPOINT = {
  method: HTTP_METHODS.DELETE,
  url: baseURL,
};

export const ADMIN_UPDATE_ENDPOINT = {
  method: HTTP_METHODS.PUT,
  url: baseURL,
};
