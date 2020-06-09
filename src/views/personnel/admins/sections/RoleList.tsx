import React from "react";
import { Loading, TableWithColorToggler } from "components/Widgets";
import Role from "models/Role";
import {
  RoleDeleteByIdFunc,
  RoleAddPolicyFunc,
  RoleDeletePolicyFunc,
} from "data/RoleRepository";
import Policy from "models/Policy";
import RoleItem from "./RoleItem";

type RoleListProps = {
  loading: boolean;
  roles: Role[];
  deleteRole: RoleDeleteByIdFunc;
  policies: Policy[];
  addPoliciesToRole: RoleAddPolicyFunc;
  deletePoliciesFromRole: RoleDeletePolicyFunc;
};

const RoleList: React.FC<RoleListProps> = ({ loading, roles, ...props }) => {
  return (
    <>
      {loading ? (
        <div className="text-center mt-3">
          <Loading />
        </div>
      ) : (
        <TableWithColorToggler
          color="light"
          columns={["name", "description", "policies", "actions"]}
        >
          <tbody>
            {roles.map((role) => (
              <RoleItem key={role.name} role={role} {...props} />
            ))}
          </tbody>
        </TableWithColorToggler>
      )}
    </>
  );
};

export default RoleList;
