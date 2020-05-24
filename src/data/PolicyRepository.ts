import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Policy from "models/Policy";
import { POLICY_GET_ALL_ENDPOINT } from "constants/api-endpoints/policy";
import { doApiRequestForHooks } from "data/utils";

export interface PolicyRepo {
  loading: boolean;
  error: string;
  message: string;
  policies: Policy[];
  getAllPolicies: () => Promise<void>;
}

function usePolicyRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [policies, setPolicies] = useState<Policy[]>([]);

  async function getAllPolicies() {
    if (loading || !isMounted.current) return;
    setError("");
    doApiRequestForHooks<Policy[]>(
      _request,
      POLICY_GET_ALL_ENDPOINT,
      isMounted,
      setPolicies,
      setLoading,
      setError,
      setMessage,
      null
    );
  }

  useEffect(() => {
    getAllPolicies();
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    loading,
    error,
    message,
    policies,
    getAllPolicies,
  };
}

export default usePolicyRepository;
