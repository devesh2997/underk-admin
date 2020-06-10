import React from "react";
import {
  Loading,
  TableWithColorToggler,
  ConfirmButton,
} from "components/Widgets";
import Role from "models/Role";
import { RoleDeleteByIdFunc } from "data/RoleRepository";
import { Badge, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

type RoleListProps = {
  loading: boolean;
  roles: Role[];
  deleteRole: RoleDeleteByIdFunc;
};

const RoleList: React.FC<RoleListProps> = ({ loading, roles, deleteRole }) => {
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
          columns={["name", "description", "policies", "actions"]}
        >
          <tbody>
            {roles.map((role) => (
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
                  <Button
                    color="secondary"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                    onClick={() =>
                      history.push({
                        pathname: "/admin/personnel/admins/roles/upsert",
                        state: {
                          role,
                        },
                      })
                    }
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <ConfirmButton
                    color="danger"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                    confirmText={`Are you sure you want to remove ${role.name} from Roles?`}
                    onConfirm={deleteRole.bind(null, role.id)}
                    showLoading
                  >
                    <i className="fas fa-trash-alt"></i>
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

export default RoleList;
