import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "session/AuthUserProvider";
import { TO, TE, isNotEmpty } from "utils";

export const doApiRequestForHooks = async <T>(request: <T>(config: AxiosRequestConfig) => Promise<ApiResponse<T>>, config: AxiosRequestConfig, isMounted: React.MutableRefObject<boolean>, setValue: React.Dispatch<React.SetStateAction<T>> | null, setLoading: React.Dispatch<React.SetStateAction<boolean>> | null, setError: React.Dispatch<React.SetStateAction<string>> | null, callback: Function | null) => {
    if (setLoading !== null)
        setLoading(true)
    let err: any, res: ApiResponse<T>

    [err, res] = await TO(request(config))
    if (err) TE(err)
    if (isMounted.current) { if (setLoading !== null) setLoading(false) }
    if (res.success) {
        if (typeof res.data !== 'undefined') {
            if (isMounted.current) { if (setValue !== null) setValue(res.data) }
        }
        else
            if (isMounted.current) { if (setError !== null) setError("Some error occurred") }
    } else {
        if (isMounted.current) { if (setError !== null) setError(res.error as string) }
    }

    if (callback !== null) {
        callback()
    }
}
