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

export interface RoleRepo {
  loading: boolean;
  error: string;
  message: string;
  roles: Role[];
  getAllRoles: () => Promise<void>;
  createRole: (data: {
    name: string;
    description: string;
    policyNames: string;
  }) => Promise<void>;
  deleteRole: (params: { id: number }) => Promise<void>;
  addPoliciesToRole: (data: {
    id: number;
    policyNames: string;
  }) => Promise<void>;
  deletePoliciesFromRole: (data: {
    id: number;
    policyNames: string;
  }) => Promise<void>;
}

function useRoleRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);

  async function getAllRoles() {
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

  async function createRole(data: {
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
      getAllRoles
    );
  }

  async function deleteRole(params: { id: number }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ROLE_DELETE_ENDPOINT, params };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAllRoles
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
      getAllRoles
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
      getAllRoles
    );
  }

  useEffect(() => {
    getAllRoles();
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
    getAllRoles,
    createRole,
    deleteRole,
    addPoliciesToRole,
    deletePoliciesFromRole,
  };
}

export default useRoleRepository;
