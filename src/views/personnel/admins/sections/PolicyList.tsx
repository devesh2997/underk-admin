import React from "react";
import { Loading, TableWithColorToggler } from "components/Widgets";
import Policy from "models/Policy";

type PolicyListProps = {
  loading: boolean;
  policies: Policy[];
};

const PolicyList: React.FC<PolicyListProps> = ({ loading, policies }) => {
  return (
    <>
      {loading ? (
        <div className="text-center mt-3">
          <Loading />
        </div>
      ) : (
        <TableWithColorToggler color="light" columns={["name", "description"]}>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.name}>
                <td>{policy.name}</td>
                <td>{policy.description}</td>
              </tr>
            ))}
          </tbody>
        </TableWithColorToggler>
      )}
    </>
  );
};

export default PolicyList;
