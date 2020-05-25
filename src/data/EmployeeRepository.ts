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

function useEmployeeRepository() {
  const isMounted = useRef(true);

  const authUser = useContext(AuthUserContext);
  const _request = authUser.doRequest;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  async function getAll() {
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

  async function create(data: {
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
      getAll
    );
  }

  async function deleteById(euid: string) {
    if (loading || !isMounted.current) return;
    setError("");
    const config = { ...EMPLOYEE_DELETE_ENDPOINT, params: { euid } };
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
    employees,
    getAll,
    create,
    deleteById,
    update,
  };
}

export default useEmployeeRepository;
