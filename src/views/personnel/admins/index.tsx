import React from "react";
import { CustomNavTabs, NavTabItem } from "components/Widgets/CustomNavTabs";
import { NavLink, TabContent, TabPane, Badge, Button } from "reactstrap";
import { useTabSelect } from "hooks/Index";
import classnames from "classnames";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import { beautifyDate } from "utils";
import Loading from "components/Widgets/Loading";
import { AdminRepo } from "data/AdminRepository";
import { RoleRepo } from "data/RoleRepository";
import { PolicyRepo } from "data/PolicyRepository";

type AdminsProps = {
  adminRepo: AdminRepo;
  roleRepo: RoleRepo;
  policyRepo: PolicyRepo;
};

const Admins: React.FC<AdminsProps> = ({ adminRepo, roleRepo, policyRepo }) => {
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
            href="#roles"
            role="tab"
          >
            Roles
          </NavLink>
        </NavTabItem>
        <NavTabItem>
          <NavLink
            aria-selected={activeTab === 3}
            className={classnames("mb-sm-3 mb-md-0", {
              active: activeTab === 3,
            })}
            onClick={(e) => toggleActiveTab(e, 3)}
            href="#policies"
            role="tab"
          >
            Policies
          </NavLink>
        </NavTabItem>
      </CustomNavTabs>
      <TabContent activeTab={"tabs" + activeTab}>
        <TabPane tabId="tabs1">
          {adminRepo.loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : (
            <TableWithColorToggler
              color="light"
              columns={[
                "alias",
                "roles",
                "policies",
                "created at",
                "updated at",
                "actions"
              ]}
            >
              <tbody>
                {adminRepo.admins.map((admin) => (
                  <tr key={admin.auid}>
                    <td>{admin.alias}</td>
                    <td>
                      {admin.roles.map((role) => (
                        <Badge key={role.id} color="primary" pill>
                          {role.name}
                        </Badge>
                      ))}
                    </td>
                    <td>
                      {admin.policies.map((policy) => (
                        <Badge key={policy.name} color="info" pill>
                          {policy.name}
                        </Badge>
                      ))}
                    </td>
                    <td>{beautifyDate(admin.created_at)}</td>
                    <td>{beautifyDate(admin.updated_at)}</td>
                    <td>
                        <Button color="info" size="sm" type="button" style={{fontSize: "0.875rem"}}>
                          <i className="fas fa-id-card"></i>
                        </Button>
                        <Button color="secondary" size="sm" type="button" style={{fontSize: "0.875rem"}}>
                          <i className="fas fa-user-edit"></i>
                        </Button>
                        <Button color="danger" size="sm" type="button" style={{fontSize: "0.875rem"}}>
                          <i className="fas fa-user-minus"></i>
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableWithColorToggler>
          )}
        </TabPane>
        <TabPane tabId="tabs2">
          {roleRepo.loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : (
            <TableWithColorToggler
              color="light"
              columns={["name", "description", "policies", "actions"]}
            >
              <tbody>
                {roleRepo.roles.map((role) => (
                  <tr key={role.name}>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      {role.policies.map((policy) => (
                        <Badge key={policy.id} color="info" pill>
                          {policy.name}
                        </Badge>
                      ))}
                    </td>
                    <td>
                        <Button color="secondary" size="sm" type="button" style={{fontSize: "0.875rem"}}>
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button color="danger" size="sm" type="button" style={{fontSize: "0.875rem"}}>
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableWithColorToggler>
          )}
        </TabPane>
        <TabPane tabId="tabs3">
          {policyRepo.loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : (
            <TableWithColorToggler
              color="light"
              columns={["name", "description"]}
            >
              <tbody>
                {policyRepo.policies.map((policy) => (
                  <tr key={policy.name}>
                    <td>{policy.name}</td>
                    <td>{policy.description}</td>
                  </tr>
                ))}
              </tbody>
            </TableWithColorToggler>
          )}
        </TabPane>
      </TabContent>
    </>
  );
};

export default Admins;
