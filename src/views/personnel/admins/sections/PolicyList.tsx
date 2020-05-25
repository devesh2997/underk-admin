import React from "react";
import { PolicyRepo } from "data/PolicyRepository";
import Loading from "components/Widgets/Loading";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";

type PolicyListProps = {
  policyRepo: PolicyRepo;
};

const PolicyList: React.FC<PolicyListProps> = ({ policyRepo }) => {
  return (
    <>
      {policyRepo.loading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <TableWithColorToggler color="light" columns={["name", "description"]}>
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
    </>
  );
};

export default PolicyList;
