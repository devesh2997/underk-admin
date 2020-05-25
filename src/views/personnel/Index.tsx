import React from "react";
import classnames from "classnames";
import { Route, Switch, Link } from "react-router-dom";
import { Container, Nav, NavItem, Row, Col } from "reactstrap";
import PersonnelHeader from "components/Headers/PersonnelHeader";
import useAdminRepository from "data/AdminRepository";
import useRoleRepository from "data/RoleRepository";
import usePolicyRepository from "data/PolicyRepository";
import useEmployeeRepository from "data/EmployeeRepository";
import Admins from "views/personnel/admins";
import Employees from "views/personnel/employees";
import { RouteType } from "routes";

const personnelRoutes: RouteType[] = [
  {
    path: "/admins",
    name: "Admins",
    icon: "fas fa-user-secret",
    component: Admins,
    layout: "/admin/personnel",
  },
  {
    path: "/employees",
    name: "Employees",
    icon: "fas fa-user-tie",
    component: Employees,
    layout: "/admin/personnel",
  },
];

const Personnel: React.FC = () => {
  const adminRepo = useAdminRepository();
  const roleRepo = useRoleRepository();
  const policyRepo = usePolicyRepository();
  const employeeRepo = useEmployeeRepository();

  function getRouteSpecificProps(route: RouteType): Object {
    switch (route.path) {
      case "/admins":
        return {
          loadingAdmins: adminRepo.loading,
          admins: adminRepo.admins,
          createAdmin: adminRepo.create,
          loadingRoles: roleRepo.loading,
          roles: roleRepo.roles,
          createRole: roleRepo.create,
          loadingPolicies: policyRepo.loading,
          policies: policyRepo.policies,
          employees: employeeRepo.employees,
        };
      case "/employees":
        return {
          loading: employeeRepo.loading,
          employees: employeeRepo.employees,
          createEmployee: employeeRepo.create,
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
            <NavItem>
              <Link
                className={classnames("mb-sm-3 mb-md-0 nav-link", {
                  active: !!match,
                })}
                to={prop.layout + prop.path}
              >
                <i className={classnames(prop.icon, "mr-2")}></i>
                {prop.name}
              </Link>
            </NavItem>
          )}
          key={key}
        />
      );
    });
  }

  return (
    <>
      <PersonnelHeader
        totalAdmins={adminRepo.admins.length}
        totalEmployees={employeeRepo.employees.length}
      />
      <Container className="mt--7 position-relative" fluid>
        <Row className="align-items-center">
          <Col>
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                {getNavLinks(personnelRoutes)}
              </Nav>
            </div>
          </Col>
        </Row>
        <Switch>{getRoutes(personnelRoutes)}</Switch>
      </Container>
    </>
  );
};

export default Personnel;
