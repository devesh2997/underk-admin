import React from "react";

import Index from "views/Index";
import Login from "views/Login";
import Tables from "views/examples/Tables";
import Personnel from "views/personnel/Index";
import Users from "views/users/Index";
import Catalogue from "views/catalogue/Index";

export type RouteType = {
  path: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  layout: string;
};

const routes: RouteType[] = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
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
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
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
