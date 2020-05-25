import React from "react";
import { BulkCreateResult } from "models/shared/BulkCreateResult";
import Type from "models/catalogue/Type";
import { AttributeValueCreateInfo } from "data/catalogue/TypeAndAttributesRepository";

type Props = {
  types: Type[];
  bulkCreateAttributeValue: (
    attributeValuesInfo: AttributeValueCreateInfo[]
  ) => Promise<void>;
  bulkCreateResult: BulkCreateResult<Type> | undefined;
};

const AttributeValueBulk: React.FC<Props> = (props: Props) => {
  return <></>;
};

export default AttributeValueBulk;
