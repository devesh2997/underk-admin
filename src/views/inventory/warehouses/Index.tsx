import React from "react";
import classnames from "classnames";
import useWarehouseRepository from "data/inventory/WarehouseRepository";
import { useTabSelect } from "hooks/Index";
import {
  Row,
  Col,
  UncontrolledAlert,
  NavLink,
  Card,
  CardBody,
  TabContent,
  TabPane,
} from "reactstrap";
import {
  CustomNavTabs,
  NavTabItem,
  Refresh,
  Loading,
} from "components/Widgets";
import CategoriesView from "views/catalogue/categories/sections/view";
import WarehousesView from "./sections/WarehousesView";
import WarehouseCreate from "./sections/WarehouseCreate";

const WareshousesTab: React.FC = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);

  const {
    warehouses,
    create,
    getAll,
    error,
    message,
    loading,
  } = useWarehouseRepository();

  return (
    <>
      {message && (
        <Row>
          <Col>
            <UncontrolledAlert color="success" fade={false}>
              <span className="alert-inner--text">{message}</span>
            </UncontrolledAlert>
          </Col>
        </Row>
      )}
      {error && (
        <Row>
          <Col>
            <UncontrolledAlert color="danger" fade={false}>
              <span className="alert-inner--text">{error}</span>
            </UncontrolledAlert>
          </Col>
        </Row>
      )}
      <Row className="align-items-center">
        <Col>
          <div className="nav-wrapper">
            <CustomNavTabs>
              <NavTabItem>
                <NavLink
                  aria-selected={activeTab === 1}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: activeTab === 1,
                  })}
                  onClick={(e) => toggleActiveTab(e, 1)}
                >
                  <i className="far fa-eye mr-2" />
                  View
                </NavLink>
              </NavTabItem>
              <NavTabItem>
                <NavLink
                  aria-selected={activeTab === 2}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: activeTab === 2,
                  })}
                  onClick={(e) => toggleActiveTab(e, 2)}
                  href="#categories"
                  role="tab"
                >
                  <i className="ni ni-fat-add mr-2"></i>
                  Add Warehouse
                </NavLink>
              </NavTabItem>
            </CustomNavTabs>
          </div>
        </Col>
        <Col lg="1">
          <span
            className="icon icon-shape bg-white rounded-circle shadow"
            onClick={getAll}
            style={{ cursor: "pointer" }}
          >
            <Refresh size={24} />
          </span>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {loading && (
          <Col lg="2">
            <Loading />
          </Col>
        )}
        {!loading && (
          <Col>
            <Card>
              <CardBody>
                <TabContent activeTab={"tabs" + activeTab}>
                  <TabPane tabId="tabs1">
                    <WarehousesView warehouses={warehouses} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={"tabs" + activeTab}>
                  <TabPane tabId="tabs2">
                    <WarehouseCreate create={create} warehouses={warehouses} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

export default WareshousesTab;
