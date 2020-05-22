import React from "react";
import classnames from "classnames";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";
import useTypeRepository from "data/catalogue/TypeAndAttributes.repository";
import Type from "models/catalogue/Type";

type Props = {
  types: Type[];
  getAllTypes: () => Promise<void>;
};

const TypesAttributesView = (props: Props) => {
  const { types, getAllTypes } = props;
  return (
    <>
      <Container fluid>
        <Button color="primary" onClick={getAllTypes}>
          Refresh
        </Button>
        <Row>
          <Col>{types && JSON.stringify(types)}</Col>
        </Row>
      </Container>
    </>
  );
};

export default TypesAttributesView;
