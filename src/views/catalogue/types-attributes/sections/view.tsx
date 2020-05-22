import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import Type from "models/catalogue/Type";
import Refresh from "components/Widgets/Refresh";

type Props = {
  types: Type[];
  getAllTypes: () => Promise<void>;
};

const TypesAttributesView = (props: Props) => {
  const { types, getAllTypes } = props;
  return (
    <>
      <Container fluid>
        <span onClick={props.getAllTypes}>
          <Refresh />
        </span>
        <Row>
          <Col>{types && JSON.stringify(types)}</Col>
        </Row>
      </Container>
    </>
  );
};

export default TypesAttributesView;
