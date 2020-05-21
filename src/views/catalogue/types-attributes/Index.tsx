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
} from "reactstrap";
import TypesAttributesView from "./sections/view";
import TypesAttributesAdd from "./sections/add";
import { useTabSelect } from "hooks/Index";

const TypesAttributesTab = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  return (
    <>
      <Container fluid>
        <Row>
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
                    <i className="far fa-eye mr-2" />
                    View
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={activeTab === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: activeTab === 2,
                    })}
                    onClick={(e) => toggleActiveTab(e, 2)}
                    href="#TypesAttributes"
                    role="tab"
                  >
                    <i className="ni ni-fat-add mr-2"></i>
                    Add Types, Subtypes or Attributes
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
                    <i className="fas fa-table mr-2"></i>
                    Bulk upload AttributeValues
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
                <TypesAttributesView />
              </TabPane>
              <TabPane tabId="tabs2">
                <TypesAttributesAdd />
              </TabPane>
              <TabPane tabId="tabs3">
                <p className="description">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth.
                </p>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TypesAttributesTab;
