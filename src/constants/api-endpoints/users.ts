import { HTTP_METHODS, baseURL } from ".";

export const USER_GET_ALL_ENDPOINT = {
    method: HTTP_METHODS.GET,
    url: baseURL + "/users",
};

export const USER_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/user",
};