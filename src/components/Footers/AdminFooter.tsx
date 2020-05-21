import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer:React.FC = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © 2019{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.underk.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              underK LLP
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.underk.in"
                rel="noopener noreferrer"
                target="_blank"
              >
                underk.in
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.underk.in./about-us"
                rel="noopener noreferrer"
                target="_blank"
              >
                About Us
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="http://www.underk.in/blogs"
                rel="noopener noreferrer"
                target="_blank"
              >
                Blog
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
