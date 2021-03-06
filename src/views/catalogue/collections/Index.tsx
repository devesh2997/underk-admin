import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Container,
  NavLink,
  Row,
  Col,
  TabPane,
  TabContent,
  UncontrolledAlert,
  Card,
  CardBody,
} from "reactstrap";
import CollectionsView from "./sections/CollectionsView";
import { useTabSelect } from "hooks/Index";
import useCollectionsRepository from "data/catalogue/CollectionsRepository";
import Refresh from "components/Widgets/Refresh";
import Loading from "components/Widgets/Loading";
import CollectionCreate from "./sections/CollectionCreate";
import { NavTabItem, CustomNavTabs } from "components/Widgets/CustomNavTabs";
import CollectionBulk from "./sections/CollectionBulk";

const CollectionsTab = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const {
    collections,
    bulkCreate,
    bulkCreateResult,
    loading,
    error,
    message,
    getAll,
    create,
  } = useCollectionsRepository();
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
                  href="#products"
                  role="tab"
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
                  href="#collections"
                  role="tab"
                >
                  <i className="ni ni-fat-add mr-2"></i>
                  Add Single Collection
                </NavLink>
              </NavTabItem>
              <NavTabItem>
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
                  Bulk upload collections
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
                    <CollectionsView collections={collections} />
                  </TabPane>
                  <TabPane tabId="tabs2">
                    <CollectionCreate
                      create={create}
                      collections={collections}
                    />
                  </TabPane>
                  <TabPane tabId="tabs3">
                    <CollectionBulk
                      collections={collections}
                      bulkCreate={bulkCreate}
                      bulkCreateResult={bulkCreateResult}
                    />
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

export default CollectionsTab;
