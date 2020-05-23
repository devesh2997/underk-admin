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
  UncontrolledAlert,
} from "reactstrap";
import CollectionsView from "./sections/CollectionsView";
import { useTabSelect } from "hooks/Index";
import useCollectionsRepository from "data/catalogue/CollectionsRepository";
import Refresh from "components/Widgets/Refresh";
import Loading from "components/Widgets/Loading";
import CollectionCreate from "./sections/CollectionCreate";

const CollectionsTab = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const {
    collections,
    loading,
    error,
    message,
    getAll,
    create,
  } = useCollectionsRepository();
  return (
    <>
      <Container fluid>
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
                    href="#collections"
                    role="tab"
                  >
                    <i className="ni ni-fat-add mr-2"></i>
                    Add Single Collection
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
                    Bulk upload collections
                  </NavLink>
                </NavItem>
              </Nav>
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
              <TabContent activeTab={"tabs" + activeTab}>
                <TabPane tabId="tabs1">
                  <CollectionsView
                    collections={collections}
                  />
                </TabPane>
                <TabPane tabId="tabs2">
                  <CollectionCreate
                    create={create}
                    collections={collections}
                  />
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
          )}
        </Row>
      </Container>
    </>
  );
};

export default CollectionsTab;
