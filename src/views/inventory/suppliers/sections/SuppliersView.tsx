import React from "react";
import classnames from "classnames";
import { Supplier } from "models/inventory/Supplier";
import { useTabSelect } from "hooks/Index";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge,
} from "reactstrap";
import {
  JsonTreeView,
  TableWithColorToggler,
  GenderIcon,
} from "components/Widgets";
import { beautifyName, getAge, beautifyDate } from "underk-utils";

type Props = {
  suppliers: Supplier[];
};

const SuppliersView: React.FC<Props> = (props: Props) => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const { suppliers } = props;
  return (
    <>
      <Container fluid></Container>
      <Row>
        <Col>
          <div className="nav-wrapper">
            <Nav
              className="nav-pills-circle flex-column flex-md-row"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <NavLink
                  aria-selected={activeTab === 1}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: activeTab === 1,
                  })}
                  onClick={(e) => toggleActiveTab(e, 1)}
                  href="#listview"
                  role="tab"
                >
                  <span className="nav-link-icon d-block">
                    <i className="fas fa-list-ul" />
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={activeTab === 2}
                  className={classnames("mb-sm-3 mb-md-0", {
                    active: activeTab === 2,
                  })}
                  onClick={(e) => toggleActiveTab(e, 2)}
                  href="#treeview"
                  role="tab"
                >
                  <span className="nav-link-icon d-block">
                    <i className="fas fa-tree" />
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <TabContent activeTab={"tabs" + activeTab}>
            <TabPane tabId="tabs1">
              <SuppliersListView suppliers={suppliers} />
            </TabPane>
            <TabPane tabId="tabs2">
              <JsonTreeView src={suppliers} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </>
  );
};

type ListViewProps = {
  suppliers: Supplier[] | undefined;
};

const SuppliersListView: React.FC<ListViewProps> = (props: ListViewProps) => {
  const suppliers = props.suppliers;

  let rows: JSX.Element[] | undefined = [];

  rows = suppliers?.map((supplier) => (
    <tr key={supplier.id}>
      <td>{supplier.id}</td>
      <td>{beautifyName(supplier.firstName, supplier.lastName)}</td>
      <td>{supplier.mobileCountryCode + " " + supplier.mobileNumber}</td>
      <td>{supplier.email}</td>
      <td>{supplier.address}</td>
      <td>
        <GenderIcon gender={supplier.gender} />{" "}
      </td>
      <td>{getAge(supplier.dob)}</td>
      <td>{beautifyDate(supplier.created_at)}</td>
    </tr>
  ));

  return (
    <TableWithColorToggler
      columns={[
        "id",
        "name",
        "mobile",
        "email",
        "address",
        "gender",
        "age",
        "created_at",
      ]}
    >
      <tbody>{rows}</tbody>
    </TableWithColorToggler>
  );
};

export default SuppliersView;
