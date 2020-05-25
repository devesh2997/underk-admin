import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import { AuthUserProvider } from "session";

ReactDOM.render(
  <AuthUserProvider>
    <HashRouter>
      <Switch>
        <Route path="/admin" component={AdminLayout} />
        <Route path="/auth" component={AuthLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </HashRouter>
  </AuthUserProvider>,
  document.getElementById("root")
);
