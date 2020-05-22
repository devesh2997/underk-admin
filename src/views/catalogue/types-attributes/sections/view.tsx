import React from "react";
import classnames from "classnames";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";
import useTypeRepository from "data/catalogue/Type.respository";

const TypesAttributesView = () => {
  const { loading, error, types, getAll } = useTypeRepository();
  return (
    <>
      <Container fluid>
        <Button color="primary" onClick={getAll}>
          Refresh
        </Button>
        <Row>
          <Col>{loading && "Loading..."}</Col>
        </Row>
        <Row>
          <Col>{error && error}</Col>
        </Row>
        <Row>
          <Col>{types && JSON.stringify(types)}</Col>
        </Row>
      </Container>
    </>
  );
};

export default TypesAttributesView;
