import { HTTP_METHODS, baseURL } from ".";

export const TYPE_GET_ALL_ENDPOINT = {
    method: HTTP_METHODS.GET,
    url: baseURL + "/types",
};

export const TYPE_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/type",
};