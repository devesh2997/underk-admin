import React from "react";
import {
  TableWithColorToggler,
  Loading,
  GenderIcon,
  ConfirmButton,
} from "components/Widgets";
import Employee from "models/Employee";
import { EmployeeDeleteByIdFunc } from "data/EmployeeRepository";
import { beautifyName, getAge } from "utils";
import { Row, NavLink, Badge, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

type EmployeeListProps = {
  loading: boolean;
  employees: Employee[];
  deleteEmployee: EmployeeDeleteByIdFunc;
};

const EmployeeList: React.FC<EmployeeListProps> = ({
  loading,
  employees,
  deleteEmployee,
}) => {
  const history = useHistory();

  return (
    <>
      {loading ? (
        <div className="text-center mt-3">
          <Loading />
        </div>
      ) : (
        <TableWithColorToggler
          color="light"
          columns={[
            "name",
            "mobile",
            "email",
            "gender",
            "age",
            "address",
            "actions",
          ]}
        >
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.euid}>
                <td>{beautifyName(employee.firstName, employee.lastName)}</td>
                <td>
                  <Row>
                    <NavLink
                      href={`tel:${
                        employee.mobileCountryCode + employee.mobileNumber
                      }`}
                    >
                      {employee.mobileCountryCode + employee.mobileNumber}
                    </NavLink>
                    <Badge color="" className="badge-dot ml-1">
                      <i
                        className={
                          employee.mobileVerified ? "bg-success" : "bg-warning"
                        }
                      />
                    </Badge>
                  </Row>
                </td>
                <td>
                  <Row>
                    <NavLink href={`mailto:${employee.email}`}>
                      {employee.email}
                    </NavLink>
                    <Badge color="" className="badge-dot ml-1">
                      <i
                        className={
                          employee.emailVerified ? "bg-success" : "bg-warning"
                        }
                      />
                    </Badge>
                  </Row>
                </td>
                <td>
                  <GenderIcon gender={employee.gender} />
                </td>
                <td>{getAge(Number(employee.dob))?.toString()}</td>
                <td>{employee.address}</td>
                <td>
                  <Button
                    color="secondary"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                    onClick={() =>
                      history.push({
                        pathname: "/admin/personnel/employees/upsert",
                        state: {
                          employee,
                        },
                      })
                    }
                  >
                    <i className="fas fa-user-edit"></i>
                  </Button>
                  <ConfirmButton
                    color="danger"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                    confirmText={`Are you sure you want to remove ${beautifyName(
                      employee.firstName,
                      employee.lastName
                    )} from Employees?`}
                    onConfirm={deleteEmployee.bind(null, employee.euid)}
                    showLoading
                  >
                    <i className="fas fa-user-minus"></i>
                  </ConfirmButton>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWithColorToggler>
      )}
    </>
  );
};

export default EmployeeList;
