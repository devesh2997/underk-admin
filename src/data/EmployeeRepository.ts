import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Employee from "models/Employee";
import {
  EMPLOYEE_GET_ALL_ENDPOINT,
  EMPLOYEE_CREATE_ENDPOINT,
  EMPLOYEE_DELETE_ENDPOINT,
  EMPLOYEE_UPDATE_ENDPOINT,
} from "constants/api-endpoints/employee";
import { doApiRequest } from "data/utils";
import { ApiResponse } from "session/AuthUserProvider";
import { ok, err, Result } from "neverthrow";
import { ApiError } from "../core/errors";

export type EmployeeGetAllFunc = () => Promise<void>;
export type EmployeeCreateFunc = (data: {
  firstName: string;
  lastName: string;
  email: string;
  mobileCountryCode: string;
  mobileNumber: number;
  dob?: number;
  gender: string;
  picUrl?: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  address: string;
}) => Promise<Result<ApiResponse<null>, string>>;
export type EmployeeDeleteByIdFunc = (euid: string) => Promise<void>;
export type EmployeeUpdateFunc = (data: {
  euid: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileCountryCode: string;
  mobileNumber: number;
  dob?: number;
  gender: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  picUrl?: string;
  address: string;
}) => Promise<Result<ApiResponse<null>, string>>;

function useEmployeeRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);

  const [loading, toggleLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<ApiError>();

  const getAll: EmployeeGetAllFunc = async () => {
    if (loading || !isMounted.current) return;

    isMounted.current && toggleLoading(true);
    isMounted.current && setError(undefined);

    const result = await doApiRequest<Employee[]>(
      authUser.doRequest,
      EMPLOYEE_GET_ALL_ENDPOINT
    );
    if (result.isErr()) {
      isMounted.current && setError(new ApiError(result.error));
      // console.error("Employee.getAll", result.error);
    } else {
      isMounted.current && setEmployees(result.value.data as Employee[]);
      // console.log("Employee.getAll", result.value.message);
    }

    isMounted.current && toggleLoading(false);
  };

  const create: EmployeeCreateFunc = async (data) => {
    if (loading) return err("Please wait for the previous request to complete");

    const config = { ...EMPLOYEE_CREATE_ENDPOINT, data };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) return err(result.error);

    getAll();

    return ok(result.value);
  };

  const deleteById: EmployeeDeleteByIdFunc = async (euid: string) => {
    if (loading) return;

    isMounted.current && setError(undefined);

    const config = { ...EMPLOYEE_DELETE_ENDPOINT, params: { euid } };
    const result = await doApiRequest<null>(authUser.doRequest, config);
    if (result.isErr()) {
      isMounted.current && setError(new ApiError(result.error));
      // console.error("Employee.deleteById", result.error);
    } else {
      // console.log("Employee.deleteById", result.value.message);

      getAll();
    }
  };

  const update: EmployeeUpdateFunc = async (data) => {
    if (loading) return err("Please wait for the previous request to complete");

    const config = { ...EMPLOYEE_UPDATE_ENDPOINT, data };
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
    employees,
    error,
    getAll,
    create,
    deleteById,
    update,
  };
}

export default useEmployeeRepository;
