import {
  isPlainObject,
  isNull,
  isBoolean,
  isNumber,
  isString,
  isArray,
  isUndefined
} from "lodash";
import { isEmptyString } from "underk-utils";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import POLICIES, { policy } from "underk-policies";
import { to } from "await-to-ts";

import { MONTHS } from "../constants";
import { Address } from "models/shared/Address";



export const getPrimaryColor = () => {
  return "#0DAC8E";
};



export const validateAddress = (address: Address) => {
  let error = ""
  let valid = true
  if (isEmptyString(address.building)) {
    return {
      valid: false,
      error: "Building is empty"
    }
  } else if (isEmptyString(address.locality)) {
    return {
      valid: false,
      error: "Locality is empty"
    }
  } else if (isEmptyString(address.landmark)) {
    return {
      valid: false,
      error: "Landmark is empty"
    }
  } else if (isEmptyString(address.city)) {
    return {
      valid: false,
      error: "City is empty"
    }
  } else if (isEmptyString(address.state)) {
    return {
      valid: false,
      error: "State is empty"
    }
  } else {
    return {
      valid: true,
    }
  }
}


export const isEmpty = (value: any) => {
  return isNull(value) || isUndefined(value);
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


export const TE = (err: any, log: boolean = true) => {
  // TE stands for Throw Error
  if (log === true) {
    console.error(err);
  }

  if (typeof err === "string") throw new Error(err);
  else throw err;
};

export const TO = async (promise: Promise<any>): Promise<[any, any]> => {
  let err, res;
  [err, res] = await to(promise);
  if (err) return [err, null];

  return [null, res];
};
