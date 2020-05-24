import React from "react";
import classnames from "classnames";

// reactstrap components
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
import Type from "models/catalogue/Type";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import { useTabSelect } from "hooks/Index";
import JsonTreeView from "components/Widgets/JsonTreeView";

type Props = {
  types: Type[];
};

const TypesAttributesView = (props: Props) => {
  const { types } = props;
  const { activeTab, toggleActiveTab } = useTabSelect(1);
  return (
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
              <TypesAttributesTableView types={types} />
            </TabPane>
            <TabPane tabId="tabs2">
              <JsonTreeView src={types} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

const TypesAttributesTableView = (props: Props) => {
  const { types } = props;
  let rows = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    if (typeof type.subtypes !== "undefined" && type.subtypes?.length > 0) {
      for (let j = 0; j < type.subtypes.length; j++) {
        const subtype = type.subtypes[j];
        if (
          typeof subtype.attributes !== "undefined" &&
          subtype.attributes.length > 0
        ) {
          for (let k = 0; k < subtype.attributes.length; k++) {
            const attribute = subtype.attributes[k];
            rows.push(
              <tr key={type.name + subtype.name + attribute.name}>
                <td>{type.name}</td>
                <td>{subtype.name}</td>
                <td>{attribute.name}</td>
              </tr>
            );
          }
        } else {
          rows.push(
            <tr key={type.name + subtype.name}>
              <td>{type.name}</td>
              <td>{subtype.name}</td>
            </tr>
          );
        }
      }
    } else {
      rows.push(
        <tr key={type.name}>
          <td>{type.name}</td>
        </tr>
      );
    }
  }
  return (
    <>
      <TableWithColorToggler
        columns={["Type", "Subtype", "Attribute", "AttributeValue"]}
      >
        <tbody>{rows}</tbody>
      </TableWithColorToggler>
    </>
  );
};

export default TypesAttributesView;
