import React from "react";
import {
  Loading,
  TableWithColorToggler,
  ConfirmButton,
} from "components/Widgets";
import Admin from "models/Admin";
import { AdminDeleteByIdFunc } from "data/AdminRepository";
import { Badge, Button } from "reactstrap";
import { beautifyDate } from "utils";
import { useHistory } from "react-router-dom";

type AdminListProps = {
  loading: boolean;
  admins: Admin[];
  deleteAdmin: AdminDeleteByIdFunc;
};

const AdminList: React.FC<AdminListProps> = ({
  loading,
  admins,
  deleteAdmin,
}) => {
  const history = useHistory();

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
                  {/* {admin.employee ? (
                    <Button
                      color="info"
                      size="sm"
                      type="button"
                      style={{ fontSize: "0.875rem" }}
                      onClick={() =>
                        history.push({
                          pathname: "/admin/personnel/employees",
                          state: {
                            highlight: admin.employee!.euid,
                          },
                        })
                      }
                    >
                      <i className="fas fa-id-card"></i>
                    </Button>
                  ) : null} */}
                  <Button
                    color="secondary"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                    onClick={() =>
                      history.push({
                        pathname: "/admin/personnel/admins/upsert",
                        state: {
                          admin,
                        },
                      })
                    }
                  >
                    <i className="fas fa-user-edit"></i>
                  </Button>
                  <ConfirmButton
                    color="danger"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                    confirmText={`Are you sure you want to remove ${admin.alias} from Admins?`}
                    onConfirm={deleteAdmin.bind(null, admin.auid)}
                    showLoading
                  >
                    <i className="fas fa-user-minus"></i>
                  </ConfirmButton>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWithColorToggler>
      )}
    </>
  );
};

export default AdminList;
