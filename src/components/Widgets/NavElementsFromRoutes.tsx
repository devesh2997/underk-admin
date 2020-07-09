import React from "react";
import { RouteType } from "routes";
import classnames from "classnames";
import { Route, Link } from "react-router-dom";
import { NavTabItem } from ".";
import { CustomNavTabs } from "./CustomNavTabs";
import { NavItem, Nav } from "reactstrap";

type NavTabsFromRoutesProps = { routes: RouteType[] };

function getNavTabLinks(routes: RouteType[]) {
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

export const CustomNavTabsFromRoutes: React.FC<NavTabsFromRoutesProps> = ({
  routes,
}) => {
  return <CustomNavTabs>{getNavTabLinks(routes)}</CustomNavTabs>;
};

export const NavFromRoutes: React.FC<NavTabsFromRoutesProps> = ({ routes }) => {
  return (
    <Nav
      className="nav-fill flex-column flex-md-row"
      id="tabs-icons-text"
      pills
      role="tablist"
    >
      {getNavLinks(routes)}
    </Nav>
  );
};
