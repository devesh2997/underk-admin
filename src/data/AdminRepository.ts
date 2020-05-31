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
import { TO, TE } from "utils";
import { ApiResponse } from "session/AuthUserProvider";

export type AdminGetAllFunc = () => Promise<void>;
export type AdminCreateFunc = (data: {
  alias: string;
  password: string;
  euid?: string;
  policyNames: string;
  roleIds: string;
}) => Promise<ApiResponse<null>>;
export type AdminDeleteByIdFunc = (auid: string) => Promise<ApiResponse<null>>;
export type AdminDeleteByAliasFunc = (
  alias: string
) => Promise<ApiResponse<null>>;
export type AdminUpdateFunc = (data: {
  auid: string;
  alias?: string;
  euid?: string;
  policyNames?: string;
  roleIds?: string;
}) => Promise<ApiResponse<null>>;

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
    const [err, res] = await TO(
      doApiRequest<Admin[]>(authUser.doRequest, ADMIN_GET_ALL_ENDPOINT)
    );
    if (err) {
      isMounted.current && setError(err.message as string);
      // console.error("Admin.getAll", err.message);
    } else {
      isMounted.current && setAdmins(res.data as Admin[]);
      // console.log("Admin.getAll", res.message);
    }
    isMounted.current && toggleLoading(false);
  };

  const create: AdminCreateFunc = async (data) => {
    if (loading) TE("Please wait for the previous request to complete");

    if(data.alias.length < 3) {
      TE("Alias must be atleast 3 characters long");
    }
    if(data.password.length < 6) {
      TE("Password must be atleast 6 characters long");
    }

    const config = { ...ADMIN_CREATE_ENDPOINT, data };

    let err: any, res: ApiResponse<null>;
    [err, res] = await TO(doApiRequest<null>(authUser.doRequest, config));
    if (err) TE(err);

    await getAll();

    return res;
  };

  const deleteById: AdminDeleteByIdFunc = async (auid) => {
    if (loading) TE("Please wait for the previous request to complete");

    const config = { ...ADMIN_DELETE_ENDPOINT, params: { auid } };

    let err: any, res: ApiResponse<null>;
    [err, res] = await TO(doApiRequest<null>(authUser.doRequest, config));
    if (err) TE(err);

    await getAll();

    return res;
  };

  const deleteByAlias: AdminDeleteByAliasFunc = async (alias) => {
    if (loading) TE("Please wait for the previous request to complete");

    const config = { ...ADMIN_DELETE_ENDPOINT, params: { alias } };

    let err: any, res: ApiResponse<null>;
    [err, res] = await TO(doApiRequest<null>(authUser.doRequest, config));
    if (err) TE(err);

    await getAll();

    return res;
  };

  const update: AdminUpdateFunc = async (data) => {
    if (loading) TE("Please wait for the previous request to complete");

    const config = { ...ADMIN_UPDATE_ENDPOINT, data };

    let err: any, res: ApiResponse<null>;
    [err, res] = await TO(doApiRequest<null>(authUser.doRequest, config));
    if (err) TE(err);

    await getAll();

    return res;
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
    deleteByAlias,
    update,
  };
}

export default useAdminRepository;
