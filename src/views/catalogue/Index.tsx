import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabPane,
  TabContent,
  CardBody,
  Card,
} from "reactstrap";
import CatalogueHeader from "components/Headers/CatalogueHeader";
import CategoriesTab from "./categories/Index";
import TypesAttributesTab from "./types-attributes/Index";
import { useTabSelect } from "hooks/Index";
import CollectionsTab from "./collections/Index";
import ProductsTab from "./products/Index";
import { RouteType } from "routes";
import { Route, Switch } from "react-router-dom";
import { NavFromRoutes } from "components/Widgets/NavElementsFromRoutes";

const catalogueRoutes: RouteType[] = [
  {
    path: "/products",
    name: "Products",
    icon: "fas fa-cubes mr-2",
    component: ProductsTab,
    layout: "/admin/catalogue",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "fas fa-cubes mr-2",
    component: CategoriesTab,
    layout: "/admin/catalogue",
  },
  {
    path: "/collections",
    name: "Collections",
    icon: "fas fa-cubes mr-2",
    component: CollectionsTab,
    layout: "/admin/catalogue",
  },
  {
    path: "/types-subtypes",
    name: "Types & Attributes",
    icon: "fas fa-cubes mr-2",
    component: TypesAttributesTab,
    layout: "/admin/catalogue",
  },
];

const Catalogue: React.FC = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  function getRoutes(routes: RouteType[]) {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          render={(props) => <prop.component {...props} />}
          key={key}
        />
      );
    });
  }
  return (
    <>
      <CatalogueHeader />
      <Container className="mt--7 position-relative" fluid>
        <Row className="align-items-center">
          <Col>
            <div className="nav-wrapper">
              <NavFromRoutes routes={catalogueRoutes} />
            </div>
          </Col>
        </Row>
        <Switch>{getRoutes(catalogueRoutes)}</Switch>
      </Container>
    </>
  );
};

export default Catalogue;
