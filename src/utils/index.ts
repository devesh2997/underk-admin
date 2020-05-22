import {
  isPlainObject,
  isNull,
  isBoolean,
  isNumber,
  isString,
  isArray,
} from "lodash";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import POLICIES, { policy } from "underk-policies";
import { to } from "await-to-ts"

import { MONTHS } from "../constants";
import { isUndefined } from "util";

//get age from dob
export const getAge = (date: any) => {
  if (isEmpty(date)) return
  let today = new Date();
  let birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const getPrimaryColor = () => {
  return "#0DAC8E"
}

export const beautifyName = (firstName?: string, lastName?: string) => {
  let beauty = ""
  firstName = firstName as string
  lastName = lastName as string
  if (isNotEmpty(firstName) && firstName.length > 0) {
    beauty += firstName[0].toUpperCase()
    if (firstName.length > 1)
      beauty += firstName.substring(1)
  }
  if (isNotEmpty(lastName) && lastName.length > 0) {
    beauty += " "
    beauty += lastName[0].toUpperCase()
    if (lastName.length > 1)
      beauty += lastName.substring(1)
  }
  return beauty
}

export const isEmpty = (value: any) => {
  return isNull(value) || isUndefined(value)
}

export const isNotEmpty = (value: any) => {
  return !isNull(value) && !isUndefined(value)
}

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
  allowedPolicies: policy[]
) => {
  return (
    userPolicies.includes(POLICIES.SUPER.name) ||
    allowedPolicies.some((policy) => userPolicies.includes(policy.name))
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

export const TE = (err: any, log: boolean = true) => {
  // TE stands for Throw Error
  if (log === true) {
    console.error(err)
  }

  if (typeof err === 'string')
    throw new Error(err)

  else throw err
}

export const TO = async (promise: Promise<any>): Promise<[any, any]> => {
  let err, res
    ;[err, res] = await to(promise)
  if (err) return [err, null]

  return [null, res]
}
