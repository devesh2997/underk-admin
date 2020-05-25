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

const Catalogue: React.FC = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  return (
    <>
      <CatalogueHeader />
      <Container className="mt--7" fluid>
        <Row  className="align-items-center">
          <Col>
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={activeTab === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: activeTab === 1,
                    })}
                    onClick={(e) => toggleActiveTab(e, 1)}
                    href="#products"
                    role="tab"
                  >
                    <i className="fas fa-cubes mr-2"></i>
                    Products
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={activeTab === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: activeTab === 2,
                    })}
                    onClick={(e) => toggleActiveTab(e, 2)}
                    href="#categories"
                    role="tab"
                  >
                    <i className="fas fa-stream mr-2"></i>
                    Categories
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={activeTab === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: activeTab === 3,
                    })}
                    onClick={(e) => toggleActiveTab(e, 3)}
                    href="#collections"
                    role="tab"
                  >
                    <i className="fas fa-layer-group mr-2"></i>
                    Collections
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={activeTab === 4}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: activeTab === 4,
                    })}
                    onClick={(e) => toggleActiveTab(e, 4)}
                    href="#types/attributes"
                    role="tab"
                  >
                    <i className="ni ni-single-copy-04 mr-2"></i>
                    {"Types & Attributes"}
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TabContent activeTab={"tabs" + activeTab}>
              <TabPane tabId="tabs1">
                <p className="description">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth.
                </p>
                <p className="description">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse.
                </p>
              </TabPane>
              <TabPane tabId="tabs2">
                <CategoriesTab />
              </TabPane>
              <TabPane tabId="tabs3">
                <CollectionsTab />
              </TabPane>
              <TabPane tabId="tabs4">
                <TypesAttributesTab />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Catalogue;
