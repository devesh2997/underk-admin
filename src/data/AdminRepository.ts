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

// TODO: define functions args
// FIXME: error and message should be a part of function return

function useAdminRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);

  async function getAll() {
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

  async function create(data: {
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
      getAll
    );
  }

  async function deleteById(auid: string) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ADMIN_DELETE_ENDPOINT, params: { auid } };
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

  async function deleteByAlias(alias: string) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...ADMIN_DELETE_ENDPOINT, params: { alias } };
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

  async function update(data: {
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
    admins,
    getAll,
    create,
    deleteById,
    deleteByAlias,
    update,
  };
}

export default useAdminRepository;
