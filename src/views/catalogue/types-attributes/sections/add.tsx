import React from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Container,
  Button,
} from "reactstrap";
import { useFormInput } from "hooks/Index";

type TypesAttributesAddState = {
  selectedEntity: string;
};

export default class TypesAttributesAdd extends React.Component<
  {},
  TypesAttributesAddState
> {
  state: TypesAttributesAddState = {
    selectedEntity: "type",
  };

  onChangeSelectedEntity = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ selectedEntity: event.currentTarget.value });
  };

  getEntityForm = () => {
    switch (this.state.selectedEntity) {
      case "Type":
        return <TypeAdd />;
      default:
        return <></>;
    }
  };

  render() {
    return (
      <>
        <Container className="mt-3" fluid>
          <Row>
            <Col>
              <Form>
                <Row>
                  <Col sm="2">
                    <h3>Select Entity to Add</h3>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        id="selectEntity"
                        name="selectedEntity"
                        type="select"
                        onChange={this.onChangeSelectedEntity}
                        value={this.state.selectedEntity}
                      >
                        <option value="-">-</option>
                        <option value="Type">Type</option>
                        <option value="Subtype">Subtype</option>
                        <option value="Attribute">Attribute</option>
                        <option value="AttributeValue">AttributeValue</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <hr className="my-3" />
          {this.getEntityForm()}
        </Container>
      </>
    );
  }
}

type TypeAddState = {
  sku: string;
  name: string;
};

const TypeAdd = () => {
  let sku = useFormInput("");
  let name = useFormInput("");

  function validateInput(): boolean {
    return sku.value.length > 0 && name.value.length > 0;
  }

  return (
    <>
      <h3 className="mb-3">Type Form :</h3>
      <Row>
        <Col sm="2">SKU:</Col>
        <Col>
          <FormGroup>
            <Input id="skuInput" name="sku" type="text" {...sku} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="2">Name:</Col>
        <Col>
          <FormGroup>
            <Input id="nameInput" name="name" type="text" {...name} />
          </FormGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="2">
          <Button color="primary" type="button" disabled={!validateInput()}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};
