import Policy from "../models/Policy";
import { URLS, HTTP_METHODS } from "../constants";
import { arrify } from "../utils";
import { AxiosRequestConfig } from "axios";

export default class PolicyRepository {
  get: (name: string) => Promise<Policy>;
  getAll: () => Promise<Policy[]>;

  constructor(request: (config: AxiosRequestConfig) => Promise<any>) {
    const _request = request;

    this.get = async (name) => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.POLICY_GET_URL,
          params: {
            name,
          },
        });
        return new Policy(response.policy);
      } catch (error) {
        throw error;
      }
    };

    this.getAll = async () => {
      try {
        const response = await _request({
          method: HTTP_METHODS.GET,
          url: URLS.POLICY_GET_ALL_URL,
        });
        return arrify(response.policies).map((policy) => new Policy(policy));
      } catch (error) {
        throw error;
      }
    };
  }
}
