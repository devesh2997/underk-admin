import React from "react";
import { RoleRepo } from "data/RoleRepository";
import Loading from "components/Widgets/Loading";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import { Badge, Button } from "reactstrap";

type RoleListProps = {
  roleRepo: RoleRepo;
};

const RoleList: React.FC<RoleListProps> = ({ roleRepo }) => {
  return (
    <>
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
