import React from "react";
import classnames from "classnames";
import { useTabSelect } from "hooks/Index";
import { Row, Col, NavLink } from "reactstrap";
import { CustomNavTabs, NavTabItem } from "components/Widgets";
import { RouteType } from "routes";
import ProductsList from "./sections/ProductsList";
import AddSingleProduct from "./sections/AddSingleProduct";
import BulkUploadProducts from "./sections/BulkUploadProducts";
import { Route, Switch } from "react-router-dom";
import { CustomNavTabsFromRoutes } from "components/Widgets/NavElementsFromRoutes";

const layout = "/admin/catalogue/products";

const productRoutes: RouteType[] = [
  {
    path: "/list",
    name: "List",
    exact: true,
    icon: "fas fa-list",
    component: ProductsList,
    layout: layout,
  },
  {
    path: "/add-single",
    name: "Add Single Product",
    exact: true,
    icon: "fas fa-list",
    component: AddSingleProduct,
    layout: layout,
  },
  {
    path: "/",
    name: "Bulk Upload Products",
    exact: true,
    icon: "fas fa-list",
    component: BulkUploadProducts,
    layout: layout,
  },
];

const ProductsTab: React.FC = () => {
  function getRoutes(routes: RouteType[]) {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          exact={prop.exact || false}
          render={(props) => <prop.component {...props} />}
          key={key}
        />
      );
    });
  }

  return (
    <>
      <>
        <CustomNavTabsFromRoutes routes={productRoutes} />
        <Switch>{getRoutes(productRoutes)}</Switch>
      </>
    </>
  );
};

export default ProductsTab;
