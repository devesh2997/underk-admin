import React from "react";
import { User } from "models/User";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import { beautifyName, beautifyDate, getAge } from "utils";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import GenderIcon from "components/Widgets/GenderIcon";

type Props = {
  users: User[];
};

const UserList: React.FC<Props> = (props) => {
  const { users } = props;

  return (
    <TableWithColorToggler
      color="light"
      columns={["id", "Name", "Mobile", "Email", "Gender", "Age", "Created At"]}
    >
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <th>{beautifyName(user.firstName, user.lastName)}</th>
            <td>
              {user.mobileNumber !== undefined && user.mobileNumber !== null && (
                <Badge color="" className="badge-dot mr-4">
                  <i
                    className={
                      user.mobileVerified ? "bg-success" : "bg-warning"
                    }
                  />
                  {user.mobileCountryCode + " " + user.mobileNumber}
                </Badge>
              )}
            </td>
            <td>
              {user.email !== undefined && user.email !== null && (
                <Badge color="" className="badge-dot mr-4">
                  <i
                    className={user.emailVerified ? "bg-success" : "bg-warning"}
                  />
                  {user.email}
                </Badge>
              )}
            </td>
            <td>
              <GenderIcon gender={user.gender} />{" "}
            </td>
            <td>{getAge(user.dob)}</td>
            <td>{beautifyDate(user.created_at)}</td>
            <td className="text-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWithColorToggler>
  );
};

export default UserList;
