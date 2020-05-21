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
import TypesAttributesView from "./sections/view";
import TypesAttributesAdd from "./sections/add";

type TypesAttributesState = {
  activeTab: number;
};

export default class TypesAttributesTab extends React.Component<
  {},
  TypesAttributesState
> {
  state: TypesAttributesState = {
    activeTab: 1,
  };

  toggleActiveTab = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    this.setState({
      activeTab: index,
    });
  };
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <div className="nav-wrapper">
                <Nav
                  className="nav-fill flex-column flex-md-row"
                  id="tabs-icons-text"
                  pills
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.activeTab === 1}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.activeTab === 1,
                      })}
                      onClick={(e) => this.toggleActiveTab(e, 1)}
                      href="#products"
                      role="tab"
                    >
                      <i className="far fa-eye mr-2" />
                      View
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.activeTab === 2}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.activeTab === 2,
                      })}
                      onClick={(e) => this.toggleActiveTab(e, 2)}
                      href="#TypesAttributes"
                      role="tab"
                    >
                      <i className="ni ni-fat-add mr-2"></i>
                      Add Types, Subtypes or Attributes
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.activeTab === 3}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.activeTab === 3,
                      })}
                      onClick={(e) => this.toggleActiveTab(e, 3)}
                      href="#collections"
                      role="tab"
                    >
                      <i className="fas fa-table mr-2"></i>
                      Bulk upload AttributeValues
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <TabContent activeTab={"tabs" + this.state.activeTab}>
                <TabPane tabId="tabs1">
                  <TypesAttributesView />
                </TabPane>
                <TabPane tabId="tabs2">
                  <TypesAttributesAdd />
                </TabPane>
                <TabPane tabId="tabs3">
                  <p className="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cleanse. Mustache cliche tempor, williamsburg carles vegan
                    helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                    synth.
                  </p>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
