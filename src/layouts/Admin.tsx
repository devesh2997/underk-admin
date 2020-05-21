import React, { useEffect, useRef } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar";
import AdminFooter from "components/Footers/AdminFooter";
import Sidebar from "components/Sidebar/Sidebar";

import routes, { RouteType } from "routes";
import { withAuthorization } from "session";

const Admin: React.FC = (props) => {
  const location = useLocation();
  const mainContent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    mainContent.current!.scrollTop = 0;
  });

  function getRoutes(routes: RouteType[]) {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  }

  function getBrandText() {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  }

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar {...props} brandText={getBrandText()} />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default withAuthorization(undefined, "/auth/login")(Admin);
