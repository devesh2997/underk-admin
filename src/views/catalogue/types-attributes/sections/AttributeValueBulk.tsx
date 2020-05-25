import React, { useState } from "react";
import { BulkCreateResult } from "models/shared/BulkCreateResult";
import Type from "models/catalogue/Type";
import { AttributeValueCreateInfo } from "data/catalogue/TypeAndAttributesRepository";
import { isEmpty, isEmptyString, isNotEmptyString } from "utils";
import { Attribute } from "models/catalogue/Attribute";

type Props = {
  types: Type[];
  bulkCreateAttributeValue: (
    attributeValuesInfo: AttributeValueCreateInfo[]
  ) => Promise<void>;
  bulkCreateResult: BulkCreateResult<Type> | undefined;
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
      const sku = row[2];
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
        if (attribute?.skuOrdering !== -1) {
          if (isEmptyString(sku)) {
            valid = false;
            errors.push(
              rowStr +
                `Attribute ${attribute?.name} has skuOrdering other than -1, so all its values must have SKU.`
            );
          }
        }
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
    }
    setValid(errors.length === 0);
    setErrors(errors);
    setAttributeValuesInfo(attributeValuesInfo);
  }
  return <></>;
};

export default AttributeValueBulk;
