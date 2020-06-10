import React from "react";
import classnames from "classnames";
import { Route, Switch, Link } from "react-router-dom";
import { RouteType } from "routes";
import AdminList from "./sections/AdminList";
import RoleList from "./sections/RoleList";
import PolicyList from "./sections/PolicyList";
import { CustomNavTabs, NavTabItem } from "components/Widgets/CustomNavTabs";
import AdminUpsert from "./sections/AdminUpsert";
import RoleUpsert from "./sections/RoleUpsert";
import Admin from "models/Admin";
import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";
import {
  AdminCreateFunc,
  AdminDeleteByIdFunc,
  AdminUpdateFunc,
} from "data/AdminRepository";
import {
  RoleCreateFunc,
  RoleDeleteByIdFunc,
  RoleAddPolicyFunc,
  RoleDeletePolicyFunc,
} from "data/RoleRepository";

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
    path: "/upsert",
    name: "Upsert Admin",
    exact: true,
    icon: "fas fa-pencil-alt",
    component: AdminUpsert,
    layout: "/admin/personnel/admins",
  },
  {
    path: "/roles/upsert",
    name: "Upsert Role",
    exact: true,
    icon: "fas fa-pencil-alt",
    component: RoleUpsert,
    layout: "/admin/personnel/admins",
  },
];

type AdminsProps = {
  loadingAdmins: boolean;
  admins: Admin[];
  createAdmin: AdminCreateFunc;
  deleteAdmin: AdminDeleteByIdFunc;
  updateAdmin: AdminUpdateFunc;
  loadingRoles: boolean;
  roles: Role[];
  createRole: RoleCreateFunc;
  deleteRole: RoleDeleteByIdFunc;
  addPoliciesToRole: RoleAddPolicyFunc;
  deletePoliciesFromRole: RoleDeletePolicyFunc;
  loadingPolicies: boolean;
  policies: Policy[];
  employees: Employee[];
};

const Admins: React.FC<AdminsProps> = ({
  loadingAdmins,
  admins,
  createAdmin,
  deleteAdmin,
  updateAdmin,
  loadingRoles,
  roles,
  createRole,
  deleteRole,
  addPoliciesToRole,
  deletePoliciesFromRole,
  loadingPolicies,
  policies,
  employees,
}) => {
  function getRouteSpecificProps(route: RouteType): Object {
    switch (route.path) {
      case "/":
        return {
          loading: loadingAdmins,
          admins,
          deleteAdmin,
        };
      case "/roles":
        return {
          loading: loadingRoles,
          roles,
          deleteRole,
        };
      case "/policies":
        return {
          loading: loadingPolicies,
          policies,
        };
      case "/upsert":
        return {
          createAdmin,
          roles,
          policies,
          employees,
          updateAdmin,
        };
      case "/roles/upsert":
        return {
          createRole,
          policies,
          addPoliciesToRole,
          deletePoliciesFromRole,
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
