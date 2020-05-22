import { HTTP_METHODS, baseURL } from ".";

export const TYPE_GET_ALL_ENDPOINT = {
    method: HTTP_METHODS.GET,
    url: baseURL + "/types",
};

export const TYPE_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/type",
};

export const SUBTYPE_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/subtype",
};

export const ATTRIBUTE_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/attribute",
};

export const ATTRIBUTE_VALUE_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/attribute-value",
};