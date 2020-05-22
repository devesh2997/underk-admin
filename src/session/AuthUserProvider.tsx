import React, { useState, useRef, useEffect } from "react";
import { AxiosRequestConfig } from "axios";

import { URLS, HTTP_METHODS } from "../constants";
import {
  axios,
  isPlainObjectWithKeys,
  getResponseStatus,
  stringify,
  TO,
  TE,
} from "../utils";

type AuthUser = {
  auid: string;
  alias: string;
  token: string;
  policies: string[];
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | undefined;
  error: string | undefined;
};

type AuthUserContextValue = {
  data: AuthUser | null;
  login: (alias: string, password: string) => Promise<void>;
  logout: () => void;
  doRequest: <T>(config: AxiosRequestConfig) => Promise<ApiResponse<T>>;
};

export const AuthUserContext = React.createContext<AuthUserContextValue>({
  data: null,
  login: async () => {},
  logout: () => {},
  doRequest: async () => {
    return { success: false, data: undefined, error: undefined };
  },
});

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

  async function doRequest<T>(config: AxiosRequestConfig) {
    if (!authUser) {
      TE("Not Authenticated");
    }

    let err: any, response;

    [err, response] = await TO(
      axios({
        ...config,
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      })
    );
    console.log(response.data);

    if (err) TE(err);

    const responseStatus = getResponseStatus(response.status);
    if (responseStatus.isUnauthorized) {
      logout();
    }
    if (!responseStatus.isSuccessful) {
      if (isMounted.current)
        TE(
          (isPlainObjectWithKeys(response.data) &&
            stringify(response.data.error)) ||
            response.statusText
        );
    }
    return {
      success: response.data.success as boolean,
      data: response.data.result as T | undefined,
      error: response.data.error as string | undefined,
    };
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
