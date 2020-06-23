import React from "react";
import { Form, Row, Col, FormGroup, Input, Container } from "reactstrap";
import { useFormInput } from "hooks/Index";
import Type from "models/catalogue/Type";
import FormWithGuidesAndErrors from "components/Widgets/FormWithGuidesAndErrors";
import SubtypeCreate from "./SubtypeCreate";
import TypeCreate from "./TypeCreate";
import { Attribute } from "models/catalogue/Attribute";
import { SKUAttribute } from "models/catalogue/SKUAttribute";
import { OptionAttribute } from "models/catalogue/OptionAttribute";

type Props = {
  types: Type[];
  createType: (sku: string, name: string) => Promise<void>;
  createSubtype: (
    sku: string,
    name: string,
    typeSku: string,
    attributes: Attribute[],
    skuAttributes: SKUAttribute[],
    optionAttributes: OptionAttribute[]
  ) => Promise<void>;
};

export const TypesAttributesCreate = (props: Props) => {
  const { types, createSubtype, createType } = props;
  const selectedEntity = useFormInput("Subtype");

  function getEntityForm() {
    switch (selectedEntity.value) {
      case "Type":
        return <TypeCreate createType={createType} types={types} />;
      case "Subtype":
        return <SubtypeCreate createSubtype={createSubtype} types={types} />;
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

export default TypesAttributesCreate;
