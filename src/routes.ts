import React from "react";

import Index from "views/Index";
import Profile from "views/examples/Profile";
import Maps from "views/examples/Maps";
import Register from "views/examples/Register";
import Login from "views/Login";
import Tables from "views/examples/Tables";
import Icons from "views/examples/Icons";
import HR from "views/hr/Index";
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
    path: "/admin",
    name: "HR",
    icon: "ni ni-air-baloon text-blue",
    component: HR,
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
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
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
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
