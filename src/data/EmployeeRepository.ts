import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Employee from "models/Employee";
import {
  EMPLOYEE_GET_ALL_ENDPOINT,
  EMPLOYEE_CREATE_ENDPOINT,
  EMPLOYEE_DELETE_ENDPOINT,
  EMPLOYEE_UPDATE_ENDPOINT,
} from "constants/api-endpoints/employee";
import { doApiRequestForHooks } from "data/utils";

export interface EmployeeRepo {
  loading: boolean;
  error: string;
  message: string;
  employees: Employee[];
  getAllEmployees: () => Promise<void>;
  createEmployee: (data: {
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
  }) => Promise<void>;
  deleteEmployee: (params: { euid: string }) => Promise<void>;
  updateEmployee: (data: {
    euid: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileCountryCode: string;
    mobileNumber: number;
    dob: number;
    gender: string;
    picUrl: string;
    mobileVerified: boolean;
    emailVerified: boolean;
    address: string;
  }) => Promise<void>;
}

function useEmployeeRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  async function getAllEmployees() {
    if (loading || !isMounted.current) return;
    setError("");
    doApiRequestForHooks<Employee[]>(
      _request,
      EMPLOYEE_GET_ALL_ENDPOINT,
      isMounted,
      setEmployees,
      setLoading,
      setError,
      setMessage,
      null
    );
  }

  async function createEmployee(data: {
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
  }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...EMPLOYEE_CREATE_ENDPOINT, data };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAllEmployees
    );
  }

  async function deleteEmployee(params: { euid: string }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...EMPLOYEE_DELETE_ENDPOINT, params };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAllEmployees
    );
  }

  async function updateEmployee(data: {
    euid: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileCountryCode: string;
    mobileNumber: number;
    dob: number;
    gender: string;
    mobileVerified: boolean;
    emailVerified: boolean;
    picUrl: string;
    address: string;
  }) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...EMPLOYEE_UPDATE_ENDPOINT, data };
    doApiRequestForHooks<null>(
      _request,
      config,
      isMounted,
      null,
      setLoading,
      setError,
      setMessage,
      getAllEmployees
    );
  }

  useEffect(() => {
    getAllEmployees();
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
    employees,
    getAllEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
  };
}

export default useEmployeeRepository;
