import React, { useState } from "react";
import { BulkCreateResult } from "models/shared/BulkCreateResult";
import Type from "models/catalogue/Type";
import { AttributeValueCreateInfo } from "data/catalogue/TypeAndAttributesRepository";
import { Attribute } from "models/catalogue/Attribute";
import FormWithGuidesAndErrors from "components/Widgets/FormWithGuidesAndErrors";
import { Container, Form, FormGroup, Label, Col, Row, Table } from "reactstrap";
import CSVReader from "react-csv-reader";
import { AttributeValue } from "models/catalogue/AttributeValue";
import { isEmpty } from "lodash";
import { isEmptyString, isNotEmptyString } from "underk-utils";

type Props = {
  types: Type[];
  bulkCreateAttributeValue: (
    attributeValuesInfo: AttributeValueCreateInfo[]
  ) => Promise<void>;
  bulkCreateResult: BulkCreateResult<AttributeValue> | undefined;
};

const AttributeValueBulk: React.FC<Props> = (props: Props) => {
  const { types, bulkCreateAttributeValue, bulkCreateResult } = props;
  let [errors, setErrors] = useState<string[]>([]);
  let [valid, setValid] = useState(false);
  let [attributeValuesInfo, setAttributeValuesInfo] = useState<
    AttributeValueCreateInfo[]
  >([]);

  function handleFileSelection(csvData: any[], _: any) {
    let attributeValuesInfo: AttributeValueCreateInfo[] = [];
    let errors: string[] = [];

    let attributes: Attribute[] = [];
    for (let i = 0; i < types.length; i++) {
      const subtypes = types[i].subtypes;
      if (subtypes !== undefined) {
        for (let j = 0; j < subtypes?.length; j++) {
          const subtypeAttributes = subtypes[j].attributes;
          if (subtypeAttributes !== undefined) {
            for (let k = 0; k < subtypeAttributes.length; k++) {
              attributes.push(subtypeAttributes[k]);
            }
          }
        }
      }
    }

    for (let i = 0; i < csvData.length; i++) {
      let isValid = true;
      const row = csvData[i];
      if (isEmpty(row)) continue;
      const attributeId = row[0];
      const name = row[1];
      let sku = row[2];
      const valueType = row[3];
      const value = row[4];
      if (
        isEmptyString(attributeId) &&
        isEmptyString(name) &&
        isEmptyString(sku)
      )
        continue;
      const rowStr = `Row ${i + 1} : `;
      if (isEmptyString(attributeId)) {
        isValid = false;
        errors.push(rowStr + "Attribute id should not be empty");
      }
      if (isEmptyString(name)) {
        isValid = false;
        errors.push(rowStr + "Name should not be empty");
      }
      const attribute = attributes.find((a) => a.id === attributeId);
      if (typeof attribute === undefined) {
        isValid = false;
        errors.push(
          rowStr + "Attribute ID does not match with any present attribute."
        );
      } else {
      }
      if (isNotEmptyString(valueType)) {
        if (valueType !== "hexcode") {
          valid = false;
          errors.push(
            rowStr + "Only hexcode value type is currently supported"
          );
        } else {
          if (isEmptyString(value)) {
            valid = false;
            errors.push(
              rowStr + "Value cannot be empty if valueType is provided"
            );
          } else {
            if (String(value).length !== 7 || String(value)[0] !== "#") {
              valid = false;
              errors.push(rowStr + "Invalid value");
            }
          }
        }
      }
      if (isValid) {
        attributeValuesInfo.push({
          attributeId: attributeId,
          name: name,
          sku: sku,
          valueType: valueType,
          value: value,
        });
      }
    }
    setValid(errors.length === 0);
    setErrors(errors);
    setAttributeValuesInfo(attributeValuesInfo);
  }
  return (
    <FormWithGuidesAndErrors
      errors={errors}
      valid={valid}
      heading={"Bulk Upload Attribute Values : "}
      guides={[
        <span>Attribute ID and name are compulsory.</span>,
        <span>
          If the attribute is used to generate product SKU, then the SKU column
          must not be empty
        </span>,
        <span>
          Currently, only one special type of attribute value is accepted e.g.
          hexcode which is to be used alongwith color attributes.
        </span>,
      ]}
      onSubmit={() => {
        bulkCreateAttributeValue(attributeValuesInfo);
      }}
    >
      <Row>
        <Col>
          <h4 className="text-muted">
            Example: (Columns marked with '*' are compulsory)
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="align-items-center">
            <thead className="thead-light">
              <tr>
                <th scope="col">Attribute ID *</th>
                <th scope="col">Name *</th>
                <th scope="col">SKU</th>
                <th scope="col">Value Type</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>black</td>
                <td>BLK</td>
                <td>hexcode</td>
                <td>#000000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>full</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr className="my-3" />
      {bulkCreateResult && (
        <>
          <Row className="mt-5">
            <Col>Bulk create result : </Col>
          </Row>
          {bulkCreateResult.errors && bulkCreateResult.errors.length > 0 && (
            <Row className="mt-5">
              <Col>
                <ul className="list-unstyled">
                  <li>
                    <h4 style={{ color: "red" }}>Errors:</h4>
                    <ul>
                      {bulkCreateResult.errors.map((err) => (
                        <li
                          key={err.index}
                        >{`Row : ${err.index} , error : ${JSON.stringify(err.error)}`}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </Col>
            </Row>
          )}
          {bulkCreateResult.entitiesCreated &&
            bulkCreateResult.entitiesCreated.length > 0 && (
              <Row className="mt-5">
                <Col>
                  <ul className="list-unstyled">
                    <li>
                      <h4 style={{ color: "info" }}>
                        AttributeValues created :
                      </h4>
                      <ul>
                        {bulkCreateResult.entitiesCreated.map((ent, i) => (
                          <li key={i}>{JSON.stringify(ent)}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </Col>
              </Row>
            )}
        </>
      )}
      <Form
        className="mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          bulkCreateAttributeValue(attributeValuesInfo);
        }}
      >
        <FormGroup row>
          <Label sm={2}>Select CSV File</Label>
          <Col sm={5}>
            <CSVReader
              cssClass="csv-reader-input"
              label=""
              inputId="ObiWan"
              inputStyle={{}}
              onFileLoaded={handleFileSelection}
            />
          </Col>
        </FormGroup>
      </Form>
    </FormWithGuidesAndErrors>
  );
};

export default AttributeValueBulk;
