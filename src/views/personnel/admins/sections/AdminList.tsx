import React from "react";
import Loading from "components/Widgets/Loading";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import { Badge, Button } from "reactstrap";
import { beautifyDate } from "utils";
import Admin from "models/Admin";

type AdminListProps = {
  loading: boolean;
  admins: Admin[]
};

const AdminList: React.FC<AdminListProps> = ({ loading, admins }) => {
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
                  <Button
                    color="info"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <i className="fas fa-id-card"></i>
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <i className="fas fa-user-edit"></i>
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <i className="fas fa-user-minus"></i>
                  </Button>
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
