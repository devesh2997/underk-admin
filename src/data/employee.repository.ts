import Employee from "../models/Employee";
import { URLS, HTTP_METHODS, EVENTS, REPO_CHANGES } from "../constants";
import { stringify, arrify } from "../utils";
import { AxiosRequestConfig } from "axios";

interface EmployeeCreateInfo {
  firstName: string;
  lastName: string;
  email: string;
  mobileCountryCode: string;
  mobileNumber: number;
  dob: number;
  gender: string;
  picUrl: string;
  address: string;
}

interface EmployeeUpdateInfo extends EmployeeCreateInfo {
  euid: string;
}

export default class EmployeeRepository {
  getById: (euid: string) => Promise<Employee>;
  getByEmail: (email: string) => Promise<Employee>;
  getByPhoneNumber: (
    mobileNumber: number,
    mobileCountryCode: string
  ) => Promise<Employee>;
  get: (params: {
    euid?: string;
    email?: string;
    mobileNumber?: number;
    mobileCountryCode?: string;
  }) => Promise<Employee>;
  getAll: () => Promise<Employee[]>;
  create: (data: EmployeeCreateInfo) => Promise<string>;
  update: (data: EmployeeUpdateInfo) => Promise<string>;
  delete: (euid: string) => Promise<string>;
  triggerStateChange: (changeType: string) => void;

  constructor(request: (config: AxiosRequestConfig) => Promise<any>) {
    const _request = request;

    this.getById = (euid) => {
      return this.get({ euid });
    };

    this.getByEmail = (email) => {
      return this.get({ email });
    };

    this.getByPhoneNumber = (mobileNumber, mobileCountryCode) => {
      return this.get({ mobileNumber, mobileCountryCode });
    };

    this.get = async (params) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.EMPLOYEE_GET_URL,
          params,
        });
        return new Employee(response.employee);
      } catch (error) {
        throw error;
      }
    };

    this.getAll = async () => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.EMPLOYEE_GET_ALL_URL,
        });
        return arrify(response.employees).map(
          (employee) => new Employee(employee)
        );
      } catch (error) {
        throw error;
      }
    };

    this.create = async ({
      firstName,
      lastName,
      email,
      mobileCountryCode,
      mobileNumber,
      dob,
      gender,
      picUrl,
      address,
    }) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.POST,
          url: URLS.EMPLOYEE_CREATE_URL,
          data: {
            firstName,
            lastName,
            email,
            mobileCountryCode,
            mobileNumber,
            dob,
            gender,
            picUrl,
            address,
          },
        });
        this.triggerStateChange(REPO_CHANGES.EMPLOYEE_CREATE);
        // return new Employee(response.employee);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.update = async ({
      euid,
      firstName,
      lastName,
      email,
      mobileCountryCode,
      mobileNumber,
      dob,
      gender,
      picUrl,
      address,
    }) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.PUT,
          url: URLS.EMPLOYEE_UPDATE_URL,
          data: {
            euid,
            firstName,
            lastName,
            email,
            mobileCountryCode,
            mobileNumber,
            dob,
            gender,
            picUrl,
            address,
          },
        });
        this.triggerStateChange(REPO_CHANGES.EMPLOYEE_UPDATE);
        // return new Employee(response.employee);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.delete = async (euid) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.DELETE,
          url: URLS.EMPLOYEE_DELETE_URL,
          params: {
            euid,
          },
        });
        this.triggerStateChange(REPO_CHANGES.EMPLOYEE_DELETE);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.triggerStateChange = (changeType) => {
      const event = new CustomEvent(EVENTS.EMPLOYEE_STATE_CHANGE, {
        detail: changeType,
      });
      window.dispatchEvent(event);
    };
  }
}