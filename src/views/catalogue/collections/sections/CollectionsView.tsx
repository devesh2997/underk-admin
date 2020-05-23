import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabPane,
  TabContent,
} from "reactstrap";
import { useTabSelect } from "hooks/Index";
import { Collection } from "models/catalogue/Collection";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import JsonTreeView from "components/Widgets/JsonTreeView";

type Props = {
  collections: Collection[];
};

const CollectionsView: React.FC<Props> = (props: Props) => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const { collections } = props;
  return (
    <>
      <Container fluid>
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
                <CollectionsListView collections={collections} />
              </TabPane>
              <TabPane tabId="tabs2">
                <JsonTreeView src={collections} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

type ListViewProps = {
  collections: Collection[] | undefined;
};

const CollectionsListView: React.FC<ListViewProps> = (props: ListViewProps) => {
  const collections = props.collections;

  let rows: JSX.Element[] | undefined = [];

  rows = collections?.map((category) => (
    <tr key={category.slug}>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.slug}</td>
    </tr>
  ));

  return (
    <TableWithColorToggler columns={["id", "name", "slug"]}>
      <tbody>{rows}</tbody>
    </TableWithColorToggler>
  );
};

export default CollectionsView;
