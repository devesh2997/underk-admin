import React from "react";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import { NavLink, Badge, Row } from "reactstrap";
import { beautifyName, getAge } from "utils";
import GenderIcon from "components/Widgets/GenderIcon";
import Loading from "components/Widgets/Loading";
import Employee from "models/Employee";

type EmployeeListProps = {
  loading: boolean;
  employees: Employee[]
};

const EmployeeList: React.FC<EmployeeListProps> = ({ loading, employees }) => {
  return (
    <>
      {loading ? (
        <div className="text-center">
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
                <td></td>
              </tr>
            ))}
          </tbody>
        </TableWithColorToggler>
      )}
    </>
  );
};

export default EmployeeList;