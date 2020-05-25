import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Role from "models/Role";
import {
  ROLE_GET_ALL_ENDPOINT,
  ROLE_CREATE_ENDPOINT,
  ROLE_DELETE_ENDPOINT,
  ROLE_ADD_POLICIES_ENDPOINT,
  ROLE_DELETE_POLICIES_ENDPOINT,
} from "constants/api-endpoints/role";
import { doApiRequestForHooks } from "data/utils";

function useRoleRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);

  async function getAll() {
    if (loading || !isMounted.current) return;
    setError("");
    doApiRequestForHooks<Role[]>(
      _request,
      ROLE_GET_ALL_ENDPOINT,
      isMounted,
      setRoles,
      setLoading,
      setError,
      setMessage,
      null
    );
  }

  async function create(data: {
    name: string;
    description: string;
    policyNames: string;
  }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ROLE_CREATE_ENDPOINT, data };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAll
    );
  }

  async function deleteById(id: number) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ROLE_DELETE_ENDPOINT, params: { id } };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAll
    );
  }

  async function addPoliciesToRole(data: { id: number; policyNames: string }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ROLE_ADD_POLICIES_ENDPOINT, data };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAll
    );
  }

  async function deletePoliciesFromRole(data: {
    id: number;
    policyNames: string;
  }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ROLE_DELETE_POLICIES_ENDPOINT, data };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAll
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
    roles,
    getAll,
    create,
    deleteById,
    addPoliciesToRole,
    deletePoliciesFromRole,
  };
}

export default useRoleRepository;
