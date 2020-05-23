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
import { useFormInput, useCheckboxInput } from "hooks/Index";
import Type from "models/catalogue/Type";
import FormWithGuidesAndErros from "components/Widgets/FormWithGuidesAndErros";

type Props = {
  types: Type[];
  createType: (sku: string, name: string) => Promise<void>;
  createSubtype(sku: string, name: string, typeSku: string): Promise<void>;
  createAttribute: (name: string, subtypeSku: string) => Promise<void>;
  createAttributeValue: (
    sku: string,
    name: string,
    attributeId: string,
    valueType: string,
    value: string
  ) => Promise<void>;
};

export const TypesAttributesCreate = (props: Props) => {
  const { types, createSubtype, createType, createAttribute } = props;
  const selectedEntity = useFormInput("-");

  function getEntityForm() {
    switch (selectedEntity.value) {
      case "Type":
        return <TypeCreate createType={createType} />;
      case "Subtype":
        return <SubtypeCreate createSubtype={createSubtype} types={types} />;
      case "Attribute":
        return (
          <AttributeCreate createAttribute={createAttribute} types={types} />
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <Container className="mt-3" fluid>
        <Row>
          <Col>
            <Form>
              <Row>
                <Col sm="2">
                  <h3>Select Entity to Create</h3>
                </Col>
                <Col>
                  <FormGroup>
                    <Input
                      id="selectEntity"
                      name="selectedEntity"
                      type="select"
                      {...selectedEntity}
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
        {getEntityForm()}
      </Container>
    </>
  );
};

const TypeCreate = (props: {
  createType: (sku: string, name: string) => Promise<void>;
}) => {
  const sku = useFormInput("");
  const name = useFormInput("");

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
          <Button
            color="primary"
            type="button"
            disabled={!validateInput()}
            onClick={() => {
              props.createType(sku.value, name.value);
            }}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

const SubtypeCreate = (props: {
  createSubtype(sku: string, name: string, typeSku: string): Promise<void>;
  types: Type[];
}) => {
  const { createSubtype, types } = props;
  const sku = useFormInput("");
  const name = useFormInput("");
  const typeSku = useFormInput("-");

  let errors: string[] = [];

  let valid = true;

  if (typeSku.value === "-") {
    valid = false;
    errors.push("Type has not been selected");
  }
  if (sku.value.length === 0) {
    valid = false;
    errors.push("SKU is empty");
  }
  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  }

  return (
    <>
      <Row>
        <Col>
          <h3 className="mb-3">Subtype Form :</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="list-unstyled">
            <li>
              Guide:
              <ul>
                <li>Selecting type from the dropdown is compulsory.</li>
                <li>Name and SKU both are compulsory</li>
              </ul>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm="2">Type:</Col>
        <Col>
          <FormGroup>
            <Input id="skuInput" name="sku" type="select" {...typeSku}>
              <option value="-">-</option>
              {types.map((t) => (
                <option key={t.sku} value={t.sku}>
                  {t.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
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
          <Button
            color="primary"
            type="button"
            disabled={!valid}
            onClick={() => {
              createSubtype(sku.value, name.value, typeSku.value);
            }}
          >
            Submit
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <ul>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const AttributeCreate = (props: {
  createAttribute: (name: string, subtypeSku: string) => Promise<void>;
  types: Type[];
}) => {
  const { createAttribute, types } = props;
  const name = useFormInput("");
  const subtypeSku = useFormInput("-");
  const skuOrdering = useFormInput("-1");
  const isOption = useCheckboxInput(false);
  const variantsBasis = useCheckboxInput(false);

  let subtypeOptions = [];
  let skuOrderingsInUse = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    if (typeof type !== "undefined") {
      const subtypes = type.subtypes;
      if (typeof subtypes !== "undefined") {
        if (typeof types[i].subtypes !== "undefined") {
          for (let j = 0; j < subtypes.length; j++) {
            const subtype = subtypes[j];
            subtypeOptions.push(
              <option key={i + j} value={subtype.sku}>
                {subtype.name}
              </option>
            );

            if (typeof subtype.attributes !== "undefined") {
              for (let k = 0; k < subtype.attributes.length; k++) {
                if (subtype.attributes[k].skuOrdering != -1)
                  skuOrderingsInUse.push(subtype.attributes[k].skuOrdering);
              }
            }
          }
        }
      }
    }
  }

  let errors: string[] = [];

  let valid = true;

  if (subtypeSku.value === "-") {
    valid = false;
    errors.push("Subtype has not been selected");
  }
  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  }

  if (isNaN(Number(skuOrdering.value))) {
    valid = false;
    errors.push("SKU ordering should be a number");
  } else {
    if (Number(skuOrdering.value) < -1) {
      valid = false;
      errors.push("SKU ordering should be greated than or equal to -1");
    }
    for (let i = 0; i < skuOrderingsInUse.length; i++) {
      if (
        Number(skuOrdering.value) !== -1 &&
        Number(skuOrdering.value) === skuOrderingsInUse[i]
      ) {
        valid = false;
        errors.push(
          "skuOrdering number is already in use. Choose some other value or enter -1 if this is not part of sku."
        );
      }
    }
  }

  return (
    <>
      <FormWithGuidesAndErros
        heading="Attribute Form : "
        valid={valid}
        errors={errors}
        onSubmit={() => {
          name.value = name.value.toLowerCase();
          createAttribute(name.value, subtypeSku.value);
        }}
        guides={[
          <span>Selecting subtype from the dropdown is compulsory.</span>,
          <span>Name is compulsory</span>,
          <span>
            <strong>skuOrdering :</strong> If the value of this attribute will
            be used to determine the final sku of the product then this field
            should be used to determine the positioning of this attribute in the
            overall sku. If this attribute is not used in sku calculation, then
            -1 should be entered. For a given subtype, no two attribute can have
            the same skuOrdering.
          </span>,
          <span>
            <strong>isOption :</strong> If this attribute provides multiple
            choices for the user then this should be checked. For example, in
            t-shirts the size attribute fulfils this condition because the user
            has to pick a size before adding the product to the cart.
          </span>,
          <span>
            <strong>variantsBasis :</strong>If this attribute provided multiple
            variants of the same product, then this should be checked. For
            example, in t-shirts, the user can see all the available colors on
            the product page.
          </span>,
        ]}
      >
        <Row className="mt-3">
          <Col sm="2">Subtype:</Col>
          <Col>
            <FormGroup>
              <Input id="skuInput" name="sku" type="select" {...subtypeSku}>
                <option value="-">-</option>
                {subtypeOptions}
              </Input>
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
        <Row className="mb-3">
          <Col>
            SKU ordering already in use for this subtype :{" "}
            {JSON.stringify(skuOrderingsInUse)}. Please choose some number other
            than these.
          </Col>
        </Row>
        <Row>
          <Col sm="2">skuOrdering:</Col>
          <Col>
            <FormGroup>
              <Input
                id="skuOrderingInput"
                name="skuOrdering"
                type="text"
                {...skuOrdering}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                id="isOption Check"
                {...isOption}
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="isOption Check">
                isOption
              </label>
            </div>
          </Col>
          <Col>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                id="variantsBasisCheck"
                {...variantsBasis}
                type="checkbox"
              />
              <label
                className="custom-control-label"
                htmlFor="variantsBasisCheck"
              >
                variantsBasis
              </label>
            </div>
          </Col>
        </Row>
      </FormWithGuidesAndErros>
    </>
  );
};

export default TypesAttributesCreate;
