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
import { Category } from "models/catalogue/Category";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import JsonTreeView from "components/Widgets/JsonTreeView";

type Props = {
  categories: Category[];
  categoriesFlatArray: Category[] | undefined;
};

const CategoriesView: React.FC<Props> = (props: Props) => {
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  const { categories, categoriesFlatArray } = props;
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
                <CategoriesListView categoriesFlatArray={categoriesFlatArray} />
              </TabPane>
              <TabPane tabId="tabs2">
                <JsonTreeView src={categories} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

type ListViewProps = {
  categoriesFlatArray: Category[] | undefined;
};

const CategoriesListView: React.FC<ListViewProps> = (props: ListViewProps) => {
  const categoriesFlatArray = props.categoriesFlatArray;

  let rows: JSX.Element[] | undefined = [];

  rows = categoriesFlatArray?.map((category) => (
    <tr key={category.slug}>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.slug}</td>
      <td>{category.sku}</td>
    </tr>
  ));

  return (
    <TableWithColorToggler columns={["id", "name", "slug", "sku"]}>
      <tbody>{rows}</tbody>
    </TableWithColorToggler>
  );
};

export default CategoriesView;
