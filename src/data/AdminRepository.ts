import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Admin from "models/Admin";
import {
  ADMIN_GET_ALL_ENDPOINT,
  ADMIN_CREATE_ENDPOINT,
  ADMIN_DELETE_ENDPOINT,
  ADMIN_UPDATE_ENDPOINT,
} from "constants/api-endpoints/admin";
import { doApiRequestForHooks } from "data/utils";

export interface AdminRepo {
  loading: boolean;
  error: string;
  message: string;
  admins: Admin[];
  getAllAdmins: () => Promise<void>;
  createAdmin: (data: {
    alias: string;
    password: string;
    euid: string;
    policyNames: string;
    roleIds: string;
  }) => Promise<void>;
  deleteAdmin: (params: { auid: string } | { alias: string }) => Promise<void>;
  updateAdmin: (data: {
    auid: string;
    alias: string;
    euid: string;
    policyNames: string;
    roleIds: string;
  }) => Promise<void>;
}

function useAdminRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);

  async function getAllAdmins() {
    if (loading || !isMounted.current) return;
    setError("");
    doApiRequestForHooks<Admin[]>(
      _request,
      ADMIN_GET_ALL_ENDPOINT,
      isMounted,
      setAdmins,
      setLoading,
      setError,
      setMessage,
      null
    );
  }

  async function createAdmin(data: {
    alias: string;
    password: string;
    euid: string;
    policyNames: string;
    roleIds: string;
  }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ADMIN_CREATE_ENDPOINT, data };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAllAdmins
    );
  }

  async function deleteAdmin(params: { auid: string } | { alias: string }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ADMIN_DELETE_ENDPOINT, params };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAllAdmins
    );
  }

  async function updateAdmin(data: {
    auid: string;
    alias: string;
    euid: string;
    policyNames: string;
    roleIds: string;
  }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ADMIN_UPDATE_ENDPOINT, data };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAllAdmins
    );
  }

  useEffect(() => {
    getAllAdmins();
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
    admins,
    getAllAdmins,
    createAdmin,
    deleteAdmin,
    updateAdmin,
  };
}

export default useAdminRepository;
