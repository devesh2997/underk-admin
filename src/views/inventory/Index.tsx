import React from "react";
import classnames from "classnames";
import { useTabSelect } from "hooks/Index";
import InventoryHeader from "components/Headers/InventoryHeader";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import WareshousesTab from "./warehouses/Index";
import SuppliersTab from "./suppliers/Index";

const Inventory: React.FC = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);

  return (
    <>
      <InventoryHeader />
      <Container fluid className="mt--7">
        <Row className="align-items-center">
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
                    href="#warehouses"
                    role="tab"
                  >
                    <i className="fas fa-cubes mr-2"></i>
                    Warehouses
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={activeTab === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: activeTab === 2,
                    })}
                    onClick={(e) => toggleActiveTab(e, 2)}
                    href="#suppliers"
                    role="tab"
                  >
                    <i className="fas fa-cubes mr-2"></i>
                    Suppliers
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
                <WareshousesTab />
              </TabPane>
              <TabPane tabId="tabs2">
                <SuppliersTab />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inventory
