import React from "react";
import { User } from "models/User";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
      color="dark"
      columns={["id", "Name", "Mobile", "Email", "Gender", "Age", "Created At"]}
    >
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <th>{beautifyName(user.firstName, user.lastName)}</th>
            <td>{user.mobileCountryCode + " " + user.mobileNumber}</td>
            <td>{user.email}</td>
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
