import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Policy from "models/Policy";
import { POLICY_GET_ALL_ENDPOINT } from "constants/api-endpoints/policy";
import { doApiRequest } from "data/utils";
import { ApiError } from "../core/errors";

export type PolicyGetAllFunc = () => Promise<void>;

function usePolicyRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);

  const [loading, toggleLoading] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<ApiError>();

  const getAll: PolicyGetAllFunc = async () => {
    if (loading || !isMounted.current) return;

    isMounted.current && toggleLoading(true);
    isMounted.current && setError(undefined);

    const result = await doApiRequest<Policy[]>(
      authUser.doRequest,
      POLICY_GET_ALL_ENDPOINT
    );
    if (result.isErr()) {
      isMounted.current && setError(new ApiError(result.error));
      // console.error("Policy.getAll", result.error);
    } else {
      isMounted.current && setPolicies(result.value.data as Policy[]);
      // console.log("Policy.getAll", result.value.message);
    }

    isMounted.current && toggleLoading(false);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    loading,
    policies,
    error,
    getAll,
  };
}

export default usePolicyRepository;
