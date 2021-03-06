import { HTTP_METHODS, baseURL } from ".";

export const PRODUCT_BULK_UPLOAD = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/products/bulk"
}

export const CATEGORY_GET_ALL_ENDPOINT = {
    method: HTTP_METHODS.GET,
    url: baseURL + "/category-trees",
};

export const CATEGORY_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/category",
};

export const CATEGORY_BULK_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/category/bulk",
};

export const COLLECTION_GET_ALL_ENDPOINT = {
    method: HTTP_METHODS.GET,
    url: baseURL + "/collections",
};

export const COLLECTION_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/collection",
};

export const COLLECTION_BULK_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/collection/bulk",
};

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

export const ATTRIBUTE_VALUE_BULK_CREATE_ENDPOINT = {
    method: HTTP_METHODS.POST,
    url: baseURL + "/attribute-value/bulk",
};