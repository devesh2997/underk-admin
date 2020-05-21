import Admin from "../models/Admin";
import { URLS, HTTP_METHODS, EVENTS, REPO_CHANGES } from "../constants";
import { stringify, arrify } from "../utils";
import { AxiosRequestConfig } from "axios";

type AdminCreateInfo = {
  alias: string;
  password: string;
  euid: string;
  policyNames: string;
  roleIds: string;
};

type AdminUpdateInfo = {
  auid: string;
  alias: string;
  euid: string;
  policyNames: string;
  roleIds: string;
};

export default class AdminRepository {
  getById: (auid: string) => Promise<Admin>;
  getByAlias: (alias: string) => Promise<Admin>;
  get: (params: { auid?: string; alias?: string }) => Promise<Admin>;
  getAll: () => Promise<Admin[]>;
  create: (data: AdminCreateInfo) => Promise<string>;
  deleteById: (auid: string) => Promise<string>;
  deleteByAlias: (alias: string) => Promise<string>;
  delete: (params: { auid?: string; alias?: string }) => Promise<string>;
  update: (data: AdminUpdateInfo) => Promise<string>;
  triggerStateChange: (changeType: string) => void;

  constructor(request: (config: AxiosRequestConfig) => Promise<any>) {
    const _request = request;

    this.getById = (auid) => {
      return this.get({ auid });
    };

    this.getByAlias = (alias) => {
      return this.get({ alias });
    };

    this.get = async (params) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.ADMIN_GET_URL,
          params,
        });
        return new Admin(response.admin);
      } catch (error) {
        throw error;
      }
    };

    this.getAll = async () => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.ADMIN_GET_ALL_URL,
        });
        return arrify(response.admins).map((admin) => new Admin(admin));
      } catch (error) {
        throw error;
      }
    };

    this.create = async ({ alias, password, euid, policyNames, roleIds }) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.POST,
          url: URLS.ADMIN_CREATE_URL,
          data: {
            alias,
            password,
            euid,
            policyNames,
            roleIds
          },
        });
        this.triggerStateChange(REPO_CHANGES.ADMIN_CREATE);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.deleteById = (auid) => {
      return this.delete({ auid });
    };

    this.deleteByAlias = (alias) => {
      return this.delete({ alias });
    };

    this.delete = async (params) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.DELETE,
          url: URLS.ADMIN_DELETE_URL,
          params,
        });
        this.triggerStateChange(REPO_CHANGES.ADMIN_DELETE);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.update = async ({ auid, alias, euid, policyNames, roleIds }) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.PUT,
          url: URLS.ADMIN_UPDATE_URL,
          data: {
            auid,
            alias,
            euid,
            policyNames,
            roleIds
          },
        });
        this.triggerStateChange(REPO_CHANGES.ADMIN_UPDATE);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.triggerStateChange = (changeType) => {
      const event = new CustomEvent(EVENTS.ADMIN_STATE_CHANGE, {
        detail: changeType,
      });
      window.dispatchEvent(event);
    };
  }
}
