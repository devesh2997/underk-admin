import React, { useState, useRef, useEffect } from "react";
import { AxiosRequestConfig } from "axios";

import { URLS, HTTP_METHODS } from "../constants";
import {
  axios,
  isPlainObjectWithKeys,
  getResponseStatus,
  objectify,
  stringify,
} from "../utils";

export interface AuthUser {
  auid: string;
  alias: string;
  token: string;
  policies: string[];
}

export interface AuthUserContextValue {
  data: AuthUser | null;
  login: (alias: string, password: string) => Promise<void>;
  logout: () => void;
  doRequest: (config: AxiosRequestConfig) => Promise<Object>;
}

export const AuthUserContext = React.createContext<AuthUserContextValue | null>(
  null
);

const AuthUserProvider: React.FC = (props) => {
  let isMounted = useRef(true);

  const [authUser, setAuthUser] = useState(getSessionFromStorage());

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  function getSessionFromStorage(): AuthUser | null {
    let authUser = localStorage.getItem("authUser");
    if (authUser) {
      return JSON.parse(authUser);
    }
    return null;
  }

  function putSessionToStorage(value: AuthUser) {
    localStorage.setItem("authUser", JSON.stringify(value));
  }

  function deleteSessionFromStorage() {
    localStorage.removeItem("authUser");
  }

  async function login(alias: string, password: string) {
    try {
      const response = await axios({
        method: HTTP_METHODS.POST,
        url: URLS.ADMIN_LOGIN_URL,
        data: {
          alias,
          password,
        },
      });
      const responseStatus = getResponseStatus(response.status);
      if (responseStatus.isSuccessful) {
        isMounted.current && setAuthUser(response.data.admin);
        putSessionToStorage(response.data.admin);
      } else {
        throw new Error(
          (isPlainObjectWithKeys(response.data) &&
            stringify(response.data.error)) ||
            response.statusText
        );
      }
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    isMounted.current && setAuthUser(null);
    deleteSessionFromStorage();
  }

  async function doRequest(config: AxiosRequestConfig) {
    if (!authUser) {
      throw new Error("Not Authenticated");
    }

    try {
      const response = await axios({
        ...config,
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      const responseStatus = getResponseStatus(response.status);
      if (responseStatus.isSuccessful) {
        return objectify(response.data);
      } else {
        if (responseStatus.isUnauthorized) {
          logout();
        }
        throw new Error(
          (isPlainObjectWithKeys(response.data) &&
            stringify(response.data.error)) ||
            response.statusText
        );
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthUserContext.Provider
      value={{
        data: authUser,
        login,
        logout,
        doRequest,
      }}
    >
      {props.children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
