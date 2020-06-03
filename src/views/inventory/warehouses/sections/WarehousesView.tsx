import React from "react";
import classnames from "classnames";
import { Warehouse } from "models/inventory/Warehouse";
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
} from "reactstrap";
import { JsonTreeView, TableWithColorToggler } from "components/Widgets";
import { beautifyAddress, beautifyDate } from "utils";

type Props = {
  warehouses: Warehouse[];
};

const WarehousesView: React.FC<Props> = (props: Props) => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const { warehouses } = props;
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
              <WarehousesListView warehouses={warehouses} />
            </TabPane>
            <TabPane tabId="tabs2">
              <JsonTreeView src={warehouses} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </>
  );
};

type ListViewProps = {
  warehouses: Warehouse[] | undefined;
};

const WarehousesListView: React.FC<ListViewProps> = (props: ListViewProps) => {
  const warehouses = props.warehouses;

  let rows: JSX.Element[] | undefined = [];

  rows = warehouses?.map((warehouse) => (
    <tr key={warehouse.id}>
      <td>{warehouse.id}</td>
      <td>{warehouse.name}</td>
      <td>{warehouse.code}</td>
      <td>{beautifyAddress(warehouse.address)}</td>
      <td>{beautifyDate(warehouse.created_at)}</td>
    </tr>
  ));

  return (
    <TableWithColorToggler
      columns={["id", "name", "code", "address", "created_at"]}
    >
      <tbody>{rows}</tbody>
    </TableWithColorToggler>
  );
};

export default WarehousesView;
