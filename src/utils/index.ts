import {
  isPlainObject,
  isNull,
  isBoolean,
  isNumber,
  isString,
  isArray,
} from "lodash";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import POLICIES from "underk-policies";

import { MONTHS } from "../constants";

export const isPlainObjectWithKeys = (value: any) => {
  return isPlainObject(value) && !isNull(value);
};

export const boolify = (value: any, defaultValue = false) => {
  return isBoolean(value) ? value : defaultValue;
};

export const numify = (value: any, defaultValue = 0) => {
  return isNumber(Number(value)) ? Number(value) : defaultValue;
};

export const stringify = (value: any, defaultValue = "") => {
  return isString(value) ? value : defaultValue;
};

export const objectify = (value: any, defaultValue = {}): Object => {
  return isPlainObjectWithKeys(value) ? value : defaultValue;
};

export const arrify = (value: any, defaultValue = []) => {
  return isArray(value) ? value : defaultValue;
};

export const getResponseStatus = (status: number) => {
  return {
    isInformational: status >= 100 && status < 200,
    isSuccessful: status >= 200 && status < 300,
    isRedirect: status >= 300 && status < 400,
    isClientError: status >= 400 && status < 500,
    isServerError: status >= 500 && status < 600,

    isUnauthorized: status === 401,
  };
};

export const axios = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await Axios(config);
    return response;
  } catch (_err) {
    const error: AxiosError = _err;
    if (error.response) {
      return error.response;
    }
    // if (error.request) {
    //   throw new Error('Something went wrong. Please try again!');
    // }
    throw error;
  }
};

export const doPoliciesMatch = (
  userPolicies: string[],
  allowedPolicies: string[]
) => {
  return (
    userPolicies.includes(POLICIES.SUPER.name) ||
    allowedPolicies.some((policy) => userPolicies.includes(policy))
    // allowedPolicies.every((policy) => userPolicies.includes(policy))
  );
};

export const beautifyDate = (date: any) => {
  date = new Date(date);
  if (!date.getTime()) {
    return "unknown";
  }
  return (
    MONTHS[date.getMonth()].substring(0, 3) +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};

export const prepareMultiOptsForRequest = (
  options: { label: string; value: string }[]
) => {
  return JSON.stringify(options.map((option) => option.value));
};
