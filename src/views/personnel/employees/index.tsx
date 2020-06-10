import React from "react";
import classnames from "classnames";
import { Route, Switch, Link } from "react-router-dom";
import { CustomNavTabs, NavTabItem } from "components/Widgets/CustomNavTabs";
import EmployeeList from "./sections/EmployeeList";
import EmployeeUpsert from "./sections/EmployeeUpsert";
import { RouteType } from "routes";
import Employee from "models/Employee";
import {
  EmployeeCreateFunc,
  EmployeeDeleteByIdFunc,
  EmployeeUpdateFunc,
} from "data/EmployeeRepository";

const employeeRoutes: RouteType[] = [
  {
    path: "/",
    name: "List",
    exact: true,
    icon: "fas fa-list",
    component: EmployeeList,
    layout: "/admin/personnel/employees",
  },
  {
    path: "/upsert",
    name: "Upsert",
    exact: true,
    icon: "fas fa-pencil-alt",
    component: EmployeeUpsert,
    layout: "/admin/personnel/employees",
  },
];

type EmployeesProps = {
  loading: boolean;
  employees: Employee[];
  createEmployee: EmployeeCreateFunc;
  deleteEmployee: EmployeeDeleteByIdFunc;
  updateEmployee: EmployeeUpdateFunc;
};

const Employees: React.FC<EmployeesProps> = ({
  loading,
  employees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
}) => {
  function getRouteSpecificProps(route: RouteType): Object {
    switch (route.path) {
      case "/":
        return {
          loading,
          employees,
          deleteEmployee,
        };
      case "/upsert":
        return {
          createEmployee,
          updateEmployee,
        };
      default:
        return {};
    }
  }

  function getRoutes(routes: RouteType[]) {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          exact={prop.exact || false}
          render={(props) => (
            <prop.component {...props} {...getRouteSpecificProps(prop)} />
          )}
          key={key}
        />
      );
    });
  }

  function getNavLinks(routes: RouteType[]) {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          exact={prop.exact || false}
          children={({ match }) => (
            <NavTabItem>
              <Link
                className={classnames("mb-sm-3 mb-md-0 nav-link", {
                  active: !!match,
                })}
                to={prop.layout + prop.path}
              >
                <i className={classnames(prop.icon, "mr-2")}></i>
                {prop.name}
              </Link>
            </NavTabItem>
          )}
          key={key}
        />
      );
    });
  }

  return (
    <>
      <CustomNavTabs>{getNavLinks(employeeRoutes)}</CustomNavTabs>
      <Switch>{getRoutes(employeeRoutes)}</Switch>
    </>
  );
};

export default Employees;
