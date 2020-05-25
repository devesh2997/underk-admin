import React from "react";
import classnames from "classnames";
import { Route, Switch, Link } from "react-router-dom";
import { RouteType } from "routes";
import AdminList from "./sections/AdminList";
import RoleList from "./sections/RoleList";
import PolicyList from "./sections/PolicyList";
import { AdminRepo } from "data/AdminRepository";
import { RoleRepo } from "data/RoleRepository";
import { PolicyRepo } from "data/PolicyRepository";
import { CustomNavTabs, NavTabItem } from "components/Widgets/CustomNavTabs";

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
];

type AdminsProps = {
  adminRepo: AdminRepo;
  roleRepo: RoleRepo;
  policyRepo: PolicyRepo;
};

const Admins: React.FC<AdminsProps> = ({ adminRepo, roleRepo, policyRepo }) => {
  function getRouteSpecificProps(route: RouteType): Object {
    switch (route.path) {
      case "/":
        return {
          adminRepo,
        };
      case "/roles":
        return {
          roleRepo,
        };
      case "/policies":
        return {
          policyRepo,
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
