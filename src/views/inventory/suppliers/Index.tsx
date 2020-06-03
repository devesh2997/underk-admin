import React from "react";
import classnames from "classnames";
import useSupplierRepository from "data/inventory/SupplierRepository";
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
import SuppliersView from "./sections/SuppliersView";
import SupplierCreate from "./sections/SupplierCreate";

const SuppliersTab: React.FC = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);

  const {
    suppliers,
    create,
    getAll,
    error,
    message,
    loading,
  } = useSupplierRepository();

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
                  Add Supplier
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
                    <SuppliersView suppliers={suppliers} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={"tabs" + activeTab}>
                  <TabPane tabId="tabs2">
                    <SupplierCreate create={create} suppliers={suppliers} />
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

export default SuppliersTab;
