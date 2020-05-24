import React, { useState, useRef, useEffect } from "react";
import { AxiosRequestConfig } from "axios";

import { ADMIN_LOGIN_ENDPOINT } from "constants/api-endpoints";
import {
  axios,
  isPlainObjectWithKeys,
  getResponseStatus,
  stringify,
  TO,
  TE,
} from "utils";

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
  message: string | undefined;
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
    return {
      success: false,
      data: undefined,
      error: undefined,
      message: undefined,
    };
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
      try {
        return JSON.parse(authUser);
      } catch (e) {
        return null;
      }
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
        ...ADMIN_LOGIN_ENDPOINT,
        data: {
          alias,
          password,
        },
      });
      console.log(response);
      const responseStatus = getResponseStatus(response.status);
      if (responseStatus.isSuccessful) {
        isMounted.current && setAuthUser(response.data.result);
        putSessionToStorage(response.data.result);
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

    if (err) TE(err);

    const responseStatus = getResponseStatus(response.status);
    if (responseStatus.isUnauthorized) {
      logout();
      return {
        success: false,
        data: undefined,
        error: undefined,
        message: undefined,
      };
    }
    if (!responseStatus.isSuccessful) {
      if (isMounted.current)
        console.log(
          (isPlainObjectWithKeys(response.data) &&
            stringify(response.data.error)) ||
            response.statusText
        );
    }
    return {
      success: response.data.success as boolean,
      data: response.data.result as T | undefined,
      error: response.data.error as string | undefined,
      message: response.data.message as string | undefined,
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
