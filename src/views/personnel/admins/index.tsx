import React from "react";
import classnames from "classnames";
import { Route, Switch, Link } from "react-router-dom";
import { RouteType } from "routes";
import AdminList from "./sections/AdminList";
import RoleList from "./sections/RoleList";
import PolicyList from "./sections/PolicyList";
import { CustomNavTabs, NavTabItem } from "components/Widgets/CustomNavTabs";
import AdminCreate from "./sections/AdminCreate";
import RoleCreate from "./sections/RoleCreate";
import Admin from "models/Admin";
import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";
import { AdminCreateFunc } from "data/AdminRepository";

const adminRoutes: RouteType[] = [
  {
    path: "/",
    name: "List",
    exact: true,
    icon: "fas fa-list",
    component: AdminList,
    layout: "/admin/personnel/admins",
  },
  {
    path: "/roles",
    name: "Roles",
    exact: true,
    icon: "fas fa-user-tag",
    component: RoleList,
    layout: "/admin/personnel/admins",
  },
  {
    path: "/policies",
    name: "Policies",
    exact: true,
    icon: "fas fa-tasks",
    component: PolicyList,
    layout: "/admin/personnel/admins",
  },
  {
    path: "/create",
    name: "Create Admin",
    exact: true,
    icon: "fas fa-plus",
    component: AdminCreate,
    layout: "/admin/personnel/admins",
  },
  {
    path: "/roles/create",
    name: "Create Role",
    exact: true,
    icon: "fas fa-plus",
    component: RoleCreate,
    layout: "/admin/personnel/admins",
  },
];

type AdminsProps = {
  loadingAdmins: boolean;
  admins: Admin[];
  createAdmin: AdminCreateFunc;
  loadingRoles: boolean;
  roles: Role[];
  createRole: (data: {
    name: string;
    description: string;
    policyNames: string;
  }) => Promise<void>;
  loadingPolicies: boolean;
  policies: Policy[];
  employees: Employee[];
};

const Admins: React.FC<AdminsProps> = ({
  loadingAdmins,
  admins,
  createAdmin,
  loadingRoles,
  roles,
  createRole,
  loadingPolicies,
  policies,
  employees,
}) => {
  function getRouteSpecificProps(route: RouteType): Object {
    switch (route.path) {
      case "/":
        return {
          loading: loadingAdmins,
          admins
        };
      case "/roles":
        return {
          loading: loadingRoles,
          roles
        };
      case "/policies":
        return {
          loading: loadingPolicies,
          policies
        };
      case "/create":
        return {
          createAdmin,
          roles,
          policies,
          employees,
        };
      case "/roles/create":
        return {
          createRole,
          policies,
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
      <>
        <CustomNavTabs>{getNavLinks(adminRoutes)}</CustomNavTabs>
        <Switch>{getRoutes(adminRoutes)}</Switch>
      </>
    </>
  );
};

export default Admins;
