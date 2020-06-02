import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Admin from "models/Admin";
import {
  ADMIN_GET_ALL_ENDPOINT,
  ADMIN_CREATE_ENDPOINT,
  ADMIN_DELETE_ENDPOINT,
  ADMIN_UPDATE_ENDPOINT,
} from "constants/api-endpoints/admin";
import { doApiRequest } from "data/utils";
import { ApiResponse } from "session/AuthUserProvider";
import { ok, err, Result } from "neverthrow";

export type AdminGetAllFunc = () => Promise<void>;
export type AdminCreateFunc = (data: {
  alias: string;
  password: string;
  euid?: string;
  policyNames: string;
  roleIds: string;
}) => Promise<Result<ApiResponse<null>, string>>;
export type AdminDeleteByIdFunc = (
  auid: string
) => Promise<Result<ApiResponse<null>, string>>;
export type AdminUpdateFunc = (data: {
  auid: string;
  alias?: string;
  euid?: string;
  policyNames?: string;
  roleIds?: string;
}) => Promise<Result<ApiResponse<null>, string>>;

function useAdminRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);

  const [loading, toggleLoading] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState("");

  const getAll: AdminGetAllFunc = async () => {
    if (loading || !isMounted.current) return;

    isMounted.current && toggleLoading(true);
    isMounted.current && setError("");

    const result = await doApiRequest<Admin[]>(
      authUser.doRequest,
      ADMIN_GET_ALL_ENDPOINT
    );
    if (result.isErr()) {
      isMounted.current && setError(result.error);
      // console.error("Admin.getAll", result.error);
    } else {
      isMounted.current && setAdmins(result.value.data as Admin[]);
      // console.log("Admin.getAll", result.value.message);
    }

    isMounted.current && toggleLoading(false);
  };

  const create: AdminCreateFunc = async (data) => {
    if (loading) return err("Please wait for the previous request to complete");

    if (data.alias.length < 3) {
      return err("Alias must be atleast 3 characters long");
    }
    if (data.password.length < 6) {
      return err("Password must be atleast 6 characters long");
    }

    const config = { ...ADMIN_CREATE_ENDPOINT, data };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) return err(result.error);

    getAll();

    return ok(result.value);
  };

  const deleteById: AdminDeleteByIdFunc = async (auid) => {
    if (loading) return err("Please wait for the previous request to complete");

    const config = { ...ADMIN_DELETE_ENDPOINT, params: { auid } };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) return err(result.error);

    getAll();

    return ok(result.value);
  };

  const update: AdminUpdateFunc = async (data) => {
    if (loading) return err("Please wait for the previous request to complete");

    const config = { ...ADMIN_UPDATE_ENDPOINT, data };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) return err(result.error);

    getAll();

    return ok(result.value);
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
    admins,
    error,
    getAll,
    create,
    deleteById,
    update,
  };
}

export default useAdminRepository;
