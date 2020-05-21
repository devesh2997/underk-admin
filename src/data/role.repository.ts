import Role from "../models/Role";
import { URLS, HTTP_METHODS, EVENTS, REPO_CHANGES } from "../constants";
import { stringify, arrify } from "../utils";
import { AxiosRequestConfig } from "axios";

export default class RoleRepository {
  get: (id: number) => Promise<Role>;
  getAll: () => Promise<Role[]>;
  create: (data: {
    name: string;
    description: string;
    policyNames: string;
  }) => Promise<string>;
  delete: (id: number) => Promise<string>;
  triggerStateChange: (changeType: string) => void;

  constructor(request: (config: AxiosRequestConfig) => Promise<any>) {
    const _request = request;

    this.get = async (id) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.ROLE_GET_URL,
          params: {
            id,
          },
        });
        return new Role(response.role);
      } catch (error) {
        throw error;
      }
    };

    this.getAll = async () => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.ROLE_GET_ALL_URL,
        });
        return arrify(response.roles).map((role) => new Role(role));
      } catch (error) {
        throw error;
      }
    };

    this.create = async ({ name, description, policyNames }) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.POST,
          url: URLS.ROLE_CREATE_URL,
          data: {
            name,
            description,
            policyNames,
          },
        });
        this.triggerStateChange(REPO_CHANGES.ROLE_CREATE);
        // return new Role(response.role);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.delete = async (id) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.DELETE,
          url: URLS.ROLE_DELETE_URL,
          params: {
            id,
          },
        });
        this.triggerStateChange(REPO_CHANGES.ROLE_DELETE);
        return stringify(response.message);
      } catch (error) {
        throw error;
      }
    };

    this.triggerStateChange = (changeType) => {
      const event = new CustomEvent(EVENTS.ROLE_STATE_CHANGE, {
        detail: changeType,
      });
      window.dispatchEvent(event);
    };
  }
}