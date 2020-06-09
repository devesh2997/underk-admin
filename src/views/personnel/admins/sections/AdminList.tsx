import React from "react";
import { Loading, TableWithColorToggler } from "components/Widgets";
import Admin from "models/Admin";
import { AdminDeleteByIdFunc, AdminUpdateFunc } from "data/AdminRepository";
import AdminItem from "./AdminItem";
import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";

type AdminListProps = {
  loading: boolean;
  admins: Admin[];
  deleteAdmin: AdminDeleteByIdFunc;
  employees: Employee[];
  roles: Role[];
  policies: Policy[];
  updateAdmin: AdminUpdateFunc;
};

const AdminList: React.FC<AdminListProps> = ({ loading, admins, ...props }) => {
  return (
    <>
      {loading ? (
        <div className="text-center mt-3">
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
            "actions",
          ]}
        >
          <tbody>
            {admins.map((admin) => (
              <AdminItem key={admin.auid} admin={admin} {...props} />
            ))}
          </tbody>
        </TableWithColorToggler>
      )}
    </>
  );
};

export default AdminList;
