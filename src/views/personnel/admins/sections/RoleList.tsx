import React from "react";
import Loading from "components/Widgets/Loading";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import { Badge, Button } from "reactstrap";
import Role from "models/Role";

type RoleListProps = {
  loading: boolean;
  roles: Role[];
};

const RoleList: React.FC<RoleListProps> = ({ loading, roles }) => {
  return (
    <>
      {loading ? (
        <div className="text-center">
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
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    type="button"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <i className="fas fa-trash-alt"></i>
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

export default RoleList;
