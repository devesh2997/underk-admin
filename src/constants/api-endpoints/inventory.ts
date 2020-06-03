import { HTTP_METHODS, baseURL } from ".";

export const WAREHOUSE_GET_ALL_ENDPOINT = {
    method: HTTP_METHODS.GET,
    url: baseURL + "/warehouses",
};

export const WAREHOUSE_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/warehouse",
};

export const SUPPLIER_GET_ALL_ENDPOINT = {
    method: HTTP_METHODS.GET,
    url: baseURL + "/suppliers",
};

export const SUPPLIER_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/supplier",
};