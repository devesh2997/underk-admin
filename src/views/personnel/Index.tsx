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
  TabContent,
  TabPane,
} from "reactstrap";
import PersonnelHeader from "components/Headers/PersonnelHeader";
import useAdminRepository from "data/AdminRepository";
import useEmployeeRepository from "data/EmployeeRepository";
import { useTabSelect } from "hooks/Index";
import Admins from "views/personnel/admins";
import Employees from "views/personnel/employees";
import useRoleRepository from "data/RoleRepository";
import usePolicyRepository from "data/PolicyRepository";

const Personnel: React.FC = () => {
  const adminRepo = useAdminRepository();
  const roleRepo = useRoleRepository();
  const policyRepo = usePolicyRepository();
  const employeeRepo = useEmployeeRepository();
  const { activeTab, toggleActiveTab } = useTabSelect(1);

  return (
    <>
      <PersonnelHeader
        totalAdmins={adminRepo.admins.length}
        totalEmployees={employeeRepo.employees.length}
      />
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
                    href="#admins"
                    role="tab"
                  >
                    <i className="fas fa-user-secret mr-2"></i>
                    Admins
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={activeTab === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: activeTab === 2,
                    })}
                    onClick={(e) => toggleActiveTab(e, 2)}
                    href="#employees"
                    role="tab"
                  >
                    <i className="fas fa-user-tie mr-2"></i>
                    Employees
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
                <Admins
                  adminRepo={adminRepo}
                  roleRepo={roleRepo}
                  policyRepo={policyRepo}
                />
              </TabPane>
              <TabPane tabId="tabs2">
                <Employees employeeRepo={employeeRepo} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Personnel;
