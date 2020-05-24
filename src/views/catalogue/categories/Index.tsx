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
} from "reactstrap";
import CategoriesView from "./sections/view";
import { useTabSelect } from "hooks/Index";
import useCategoriesRepository from "data/catalogue/CategoriesRepository";
import Refresh from "components/Widgets/Refresh";
import Loading from "components/Widgets/Loading";
import CategoryCreate from "./sections/CategoryCreate";
import CategoryBulk from "./sections/CategoryBulk";
import { CustomNavTabs, NavTabItem } from "components/Widgets/CustomNavTabs";

const CategoriesTab = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const {
    categories,
    categoriesFlatArray,
    bulkCreate,
    bulkCreateResult,
    loading,
    error,
    message,
    getAll,
    create,
  } = useCategoriesRepository();
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
                    Add Single Category
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
                    Bulk upload categories
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
              <TabContent activeTab={"tabs" + activeTab}>
                <TabPane tabId="tabs1">
                  <CategoriesView
                    categories={categories}
                    categoriesFlatArray={categoriesFlatArray}
                  />
                </TabPane>
                <TabPane tabId="tabs2">
                  <CategoryCreate
                    create={create}
                    categories={categoriesFlatArray}
                  />
                </TabPane>
                <TabPane tabId="tabs3">
                  <CategoryBulk categories={categoriesFlatArray} bulkCreateResult={bulkCreateResult} bulkCreate={bulkCreate}/>
                </TabPane>
              </TabContent>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CategoriesTab;
