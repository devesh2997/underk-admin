import React from "react";
import CustomHeader from "components/Headers/CustomHeader";
import { beautifyNumber } from "utils";

type PersonnelHeaderProps = {
  totalAdmins: number;
  totalEmployees: number;
};

const PersonnelHeader: React.FC<PersonnelHeaderProps> = ({
  totalAdmins,
  totalEmployees,
}) => {
  return (
    <CustomHeader
      cards={[
        {
          title: "TOTAL ADMINS",
          value: beautifyNumber(totalAdmins),
          icon: "fas fa-user-secret",
        },
        {
          title: "TOTAL EMPLOYEES",
          value: beautifyNumber(totalEmployees),
          icon: "fas fa-user-tie",
        },
      ]}
    />
  );
};

export default PersonnelHeader;
