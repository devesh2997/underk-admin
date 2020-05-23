import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledAlert,
} from "reactstrap";
import UsersHeader from "components/Headers/UsersHeader";
import { useTabSelect } from "hooks/Index";
import useUsersRepository from "data/UsersRepository";
import Loading from "components/Widgets/Loading";
import UserList from "./UserList";
import Refresh from "components/Widgets/Refresh";
import UserCreate from "./UserCreate";

const Users: React.FC = () => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const {
    loading,
    error,
    message,
    users,
    getAll,
    create,
  } = useUsersRepository();
  return (
    <>
      <UsersHeader totalUsers={users.length}></UsersHeader>
      <Container className="mt--7" fluid>
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
                    href="#products"
                    role="tab"
                  >
                    <i className="ni ni-bullet-list-67 mr-2"></i>
                    List
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
                    <i className="ni ni-fat-add mr-2"></i>
                    Create New User
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
                  <UserList users={users} />
                </TabPane>
                <TabPane tabId="tabs2">
                  <UserCreate create={create} />
                </TabPane>
              </TabContent>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Users;
