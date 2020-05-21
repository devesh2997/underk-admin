import React from "react";
import classnames from "classnames";

// reactstrap components
import {
    Container, Nav, NavItem, NavLink, Row, Col, TabPane, TabContent, CardBody, Card,
} from "reactstrap";
import CatalogueHeader from "components/Headers/CatalogueHeader";
import CategoriesTab from "./categories/Index";

type CatalogueViewState = {
    activeTab: number
}

export default class Catalogue extends React.Component<{}, CatalogueViewState> {
    state: CatalogueViewState = {
        activeTab: 1
    }

    toggleActiveTab = (e: React.MouseEvent<HTMLElement>, index:number) => {
        e.preventDefault();
        this.setState({
          activeTab: index
        });
      }

    render() {
        return (
            <><CatalogueHeader /> 
            <Container className="mt--7" fluid>
                <Row><Col><div className="nav-wrapper">
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
                Products
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
                Categories
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
                Collections
              </NavLink>
            </NavItem>
          </Nav>
        </div></Col></Row>
        <Row>
        <Card className="shadow">
          <CardBody>
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
                <CategoriesTab/>
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
          </CardBody>
        </Card>
        </Row>
            
            </Container>
        </>)
    }

}