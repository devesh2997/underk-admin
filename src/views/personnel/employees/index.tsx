import React from "react";
import { CustomNavTabs, NavTabItem } from "components/Widgets/CustomNavTabs";
import {
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useTabSelect } from "hooks/Index";
import classnames from "classnames";
import Loading from "components/Widgets/Loading";
import { EmployeeRepo } from "data/EmployeeRepository";
import EmployeeList from "./sections/EmployeeList";
import EmployeeCreate from "./sections/EmployeeCreate";

type EmployeesProps = {
  employeeRepo: EmployeeRepo;
};

const Employees: React.FC<EmployeesProps> = ({ employeeRepo }) => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);

  return (
    <>
      <CustomNavTabs>
        <NavTabItem>
          <NavLink
            aria-selected={activeTab === 1}
            className={classnames("mb-sm-3 mb-md-0", {
              active: activeTab === 1,
            })}
            onClick={(e) => toggleActiveTab(e, 1)}
            href="#view"
            role="tab"
          >
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
            href="#create"
            role="tab"
          >
            Create
          </NavLink>
        </NavTabItem>
      </CustomNavTabs>
      <TabContent activeTab={"tabs" + activeTab}>
        <TabPane tabId="tabs1">
          {employeeRepo.loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : (
            <EmployeeList employeeRepo={employeeRepo} />
          )}
        </TabPane>
        <TabPane tabId="tabs2">
          <EmployeeCreate employeeRepo={employeeRepo} />
        </TabPane>
      </TabContent>
    </>
  );
};

export default Employees;
