import React from "react";
import Type from "models/catalogue/Type";
import { useFormInput } from "hooks/Index";
import { FormWithGuidesAndErrors } from "components/Widgets";
import { Row, Col, FormGroup, Input } from "reactstrap";

const TypeCreate = (props: {
  createType: (sku: string, name: string) => Promise<void>;
  types: Type[];
}) => {
  const { createType, types } = props;
  const sku = useFormInput("");
  const name = useFormInput("");

  let errors: string[] = [];
  let valid = true;
  if (sku.value.length === 0) {
    valid = false;
    errors.push("SKU is empty");
  } else {
    if (types.some((t) => t.sku === sku.value)) {
      valid = false;
      errors.push("SKU is already in use.");
    }
  }

  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  }

  return (
    <>
      <FormWithGuidesAndErrors
        errors={errors}
        valid={valid}
        heading="Type Form :"
        onSubmit={() => createType(sku.value, name.value)}
        guides={[
          <span>Name and SKU both are compulsory.</span>,
          <span>
            SKU should be unique. No two Types can have the same SKU.
          </span>,
        ]}
      >
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
      </FormWithGuidesAndErrors>
    </>
  );
};

export default TypeCreate;
