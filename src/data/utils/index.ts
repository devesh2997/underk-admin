import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "session/AuthUserProvider";
import { TO, TE } from "utils";
import { ok, err, Result } from "neverthrow";

export const doApiRequestForHooks = async <T>(
  request: <T>(config: AxiosRequestConfig) => Promise<ApiResponse<T>>,
  config: AxiosRequestConfig,
  isMounted: React.MutableRefObject<boolean>,
  setValue: React.Dispatch<React.SetStateAction<T>> | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>> | null,
  setError: React.Dispatch<React.SetStateAction<string>> | null,
  setMessage: React.Dispatch<React.SetStateAction<string>> | null,
  callback: Function | null
) => {
  if (setLoading !== null) setLoading(true);
  let err: any, res: ApiResponse<T>;

  [err, res] = await TO(request(config));
  if (err) TE(err);
  if (isMounted.current) {
    if (setLoading !== null) setLoading(false);
  }
  if (res.success) {
    console.log(res.data);
    if (typeof res.data !== "undefined") {
      if (isMounted.current) {
        if (setValue !== null) setValue(res.data);
      }
      if (isMounted.current) {
        if (setMessage !== null) setMessage(res.message as string);
      }
    } else {
      if (isMounted.current) {
        if (setError !== null) setError("Some error occurred");
      }
    }
    if (callback !== null) {
      callback();
    }
  } else {
    if (isMounted.current) {
      if (setError !== null) setError(res.error as string);
    }
  }
};

export const doApiRequest = async <T>(
  request: <T>(config: AxiosRequestConfig) => Promise<ApiResponse<T>>,
  config: AxiosRequestConfig
): Promise<Result<ApiResponse<T>, string>> => {
  let error: any, response: ApiResponse<T>;

  [error, response] = await TO(request(config));

  if (error) return err(error);
  if (!response.success) return err(response.error as string);
  if (typeof response.data === "undefined") return err("Some error occurred");

  return ok(response);
};
