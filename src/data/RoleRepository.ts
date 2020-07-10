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
import { doApiRequest } from "data/utils";
import { ApiResponse } from "session/AuthUserProvider";
import { ok, err, Result } from "neverthrow";
import { ApiError } from "../core/errors";

export type RoleGetAllFunc = () => Promise<void>;
export type RoleCreateFunc = (data: {
  name: string;
  description: string;
  policyNames: string;
}) => Promise<Result<ApiResponse<null>, string>>;
export type RoleDeleteByIdFunc = (id: number) => Promise<void>;
export type RoleAddPolicyFunc = (data: {
  id: number;
  policyNames: string;
}) => Promise<Result<ApiResponse<null>, string>>;
export type RoleDeletePolicyFunc = (data: {
  id: number;
  policyNames: string;
}) => Promise<Result<ApiResponse<null>, string>>;

function useRoleRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);

  const [loading, toggleLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<ApiError>();

  const getAll: RoleGetAllFunc = async () => {
    if (loading || !isMounted.current) return;

    isMounted.current && toggleLoading(true);
    isMounted.current && setError(undefined);

    const result = await doApiRequest<Role[]>(
      authUser.doRequest,
      ROLE_GET_ALL_ENDPOINT
    );
    if (result.isErr()) {
      isMounted.current && setError(new ApiError(result.error));
      // console.error("Role.getAll", result.error);
    } else {
      isMounted.current && setRoles(result.value.data as Role[]);
      // console.log("Role.getAll", result.value.message);
    }

    isMounted.current && toggleLoading(false);
  };

  const create: RoleCreateFunc = async (data) => {
    if (loading) return err("Please wait for the previous request to complete");

    const config = { ...ROLE_CREATE_ENDPOINT, data };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) return err(result.error);

    getAll();

    return ok(result.value);
  };

  const deleteById: RoleDeleteByIdFunc = async (id) => {
    if (loading) return;

    isMounted.current && setError(undefined);

    const config = { ...ROLE_DELETE_ENDPOINT, params: { id } };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) {
      isMounted.current && setError(new ApiError(result.error));
      // console.error("Role.deleteById", result.error);
    } else {
      // console.log("Role.deleteById", result.value.message);

      getAll();
    }
  };

  const addPoliciesToRole: RoleAddPolicyFunc = async (data) => {
    if (loading) return err("Please wait for the previous request to complete");

    const config = { ...ROLE_ADD_POLICIES_ENDPOINT, data };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) return err(result.error);

    getAll();

    return ok(result.value);
  };

  const deletePoliciesFromRole: RoleDeletePolicyFunc = async (data) => {
    if (loading) return err("Please wait for the previous request to complete");

    const config = { ...ROLE_DELETE_POLICIES_ENDPOINT, data };
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
    roles,
    error,
    getAll,
    create,
    deleteById,
    addPoliciesToRole,
    deletePoliciesFromRole,
  };
}

export default useRoleRepository;
