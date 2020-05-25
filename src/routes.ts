import React from "react";

import Dashboard from "views/Dashboard";
import Personnel from "views/personnel/Index";
import Users from "views/users/Index";
import Catalogue from "views/catalogue/Index";
import Login from "views/Login";

export type RouteType = {
  path: string;
  name: string;
  exact?: boolean;
  icon?: string;
  component: React.ComponentType<any>;
  layout: string;
  // allowedPolicies?: string[];
};

const routes: RouteType[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/personnel",
    name: "Personnel",
    icon: "ni ni-air-baloon text-blue",
    component: Personnel,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/catalogue",
    name: "Catalogue",
    icon: "ni ni-box-2 text-orange",
    component: Catalogue,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
