import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Policy from "models/Policy";
import { POLICY_GET_ALL_ENDPOINT } from "constants/api-endpoints/policy";
import { doApiRequestForHooks } from "data/utils";

function usePolicyRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [policies, setPolicies] = useState<Policy[]>([]);

  async function getAll() {
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
    getAll();
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
    getAll,
  };
}

export default usePolicyRepository;
