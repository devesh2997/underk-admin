import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "session/AuthUserProvider";
import { TO, TE } from "utils";

export const doApiRequestForHooks = async <T>(request: <T>(config: AxiosRequestConfig) => Promise<ApiResponse<T>>, config: AxiosRequestConfig, isMounted: React.MutableRefObject<boolean>, setValue: React.Dispatch<React.SetStateAction<T>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
    setLoading(true)
    let err: any, res: ApiResponse<T>

    [err, res] = await TO(request(config))
    if (err) TE(err)
    if (isMounted.current) setLoading(false)
    if (res.success) {
        if (typeof res.data !== 'undefined') {
            if (isMounted.current) setValue(res.data)
        }
        else
            if (isMounted.current) setError("Some error occurred")
    } else {
        if (isMounted.current) setError(res.error as string)
    }
}
