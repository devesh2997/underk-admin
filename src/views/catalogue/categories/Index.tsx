import React from "react";
import classnames from "classnames";

// reactstrap components
import {
    Container, Nav, NavItem, NavLink, Row, Col, TabPane, TabContent, 
} from "reactstrap";
import CategoriesView from "./sections/view";

type CategoriesState = {
    activeTab: number
}

export default class CategoriesTab extends React.Component<{},CategoriesState> {
    state: CategoriesState = {
        activeTab: 1
    }

    toggleActiveTab = (e: React.MouseEvent<HTMLElement>, index:number) => {
        e.preventDefault();
        this.setState({
          activeTab: index
        });
      }
    render (){
        return (<>
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
                  active: this.state.activeTab === 1
                })}
                onClick={e => this.toggleActiveTab(e, 1)}
                href="#products"
                role="tab"
              >
                <i className="fas fa-cubes mr-2"></i>
                View
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.activeTab === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.activeTab === 2
                })}
                onClick={e => this.toggleActiveTab(e, 2)}
                href="#categories"
                role="tab"
              >
                <i className="fas fa-stream mr-2"></i>
                Add Single Category
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.activeTab === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.activeTab === 3
                })}
                onClick={e => this.toggleActiveTab(e, 3)}
                href="#collections"
                role="tab"
              >
                <i className="fas fa-layer-group mr-2"></i>
                Bulk upload categories
              </NavLink>
            </NavItem>
          </Nav>
        </div>
                </Col>
            </Row>
            <Row>
        <Container fluid>
            <TabContent activeTab={"tabs" + this.state.activeTab}>
              <TabPane tabId="tabs1">
                <CategoriesView/>
              </TabPane>
              <TabPane tabId="tabs2">
                Test
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
            </Container>
        </Row>
        </Container>
        </>)
    }
}