import React from "react";
import classnames from "classnames";

// reactstrap components
import {
    Container, Nav, NavItem, NavLink, Row, Col, TabPane, TabContent, 
} from "reactstrap";

type CategoriesViewState = {
    activeTab: number
}

export default class CategoriesView extends React.Component<{},CategoriesViewState>{
    state: CategoriesViewState = {
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
            className="nav-pills-circle flex-column flex-md-row"
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
                href="#listview"
                role="tab"
              >
                <span className="nav-link-icon d-block">
                <i className="fas fa-list-ul"/>
              </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.activeTab === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.activeTab === 2
                })}
                onClick={e => this.toggleActiveTab(e, 2)}
                href="#treeview"
                role="tab"
              >
                <span className="nav-link-icon d-block">
                <i className="fas fa-tree"/>
              </span>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
                </Col>
            </Row>
            <Row>
            <TabContent activeTab={"tabs" + this.state.activeTab}>
              <TabPane tabId="tabs1">
                <p className="description">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth.
                </p>
                <p className="description">
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse.
                </p>
              </TabPane>
              <TabPane tabId="tabs2">
                Test
              </TabPane>
            </TabContent>
        </Row>
        </Container>
        </>)
    }
}