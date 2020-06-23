import React, { useState } from "react";
import Type from "models/catalogue/Type";
import { useFormInput } from "hooks/Index";
import { FormWithGuidesAndErrors } from "components/Widgets";
import { Row, Col, FormGroup, Input, Button } from "reactstrap";
import { Attribute } from "models/catalogue/Attribute";
import { SKUAttribute } from "models/catalogue/SKUAttribute";
import { OptionAttribute } from "models/catalogue/OptionAttribute";

const SubtypeCreate = (props: {
  createSubtype: (
    sku: string,
    name: string,
    typeSku: string,
    attributes: Attribute[],
    skuAttributes: SKUAttribute[],
    optionAttributes: OptionAttribute[]
  ) => Promise<void>;
  types: Type[];
}) => {
  const { createSubtype, types } = props;
  const sku = useFormInput("");
  const name = useFormInput("");
  const typeSku = useFormInput("-");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [skuAttributes, setSKUAttributes] = useState<SKUAttribute[]>([]);
  const [optionAttributes, setOptionAttributes] = useState<OptionAttribute[]>(
    []
  );

  //addSKUAttribute
  const addSKUAttribute = () => {
    setSKUAttributes((skuAttributes) => {
      return [
        ...skuAttributes,
        {
          name: "",
          skuOrdering: skuAttributes.length,
          variantsBasis: false,
          isFilterable: false,
          values: [{ name: "", sku: "", valueType: "none", value: "" }],
        },
      ];
    });
  };

  //add sku attribute value
  const addSKUAttributeValue = (index: number) => {
    setSKUAttributes((skuAttributes) => {
      return skuAttributes.map((a, i) =>
        i !== index
          ? a
          : {
              ...a,
              values: [
                ...a.values,
                { name: "", sku: "", valueType: "none", value: "" },
              ],
            }
      );
    });
  };

  //remove sku attribute
  const removeSKUAttribute = (index: number) => {
    setSKUAttributes((skuAttributes) => {
      return skuAttributes.filter((_, i) => i != index);
    });
  };

  //remove sku attribute value
  const removeSKUAttributeValue = (
    attributeIndex: number,
    valueIndex: number
  ) => {
    setSKUAttributes((skuAttributes) => {
      return skuAttributes.map((a, i) =>
        i !== attributeIndex
          ? a
          : { ...a, values: a.values.filter((_, j) => j !== valueIndex) }
      );
    });
  };

  //skuAttributeChangeHandler
  const skuAttributeChangeHandler = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index < 0 || index >= skuAttributes.length) return;
    switch (e.currentTarget.name) {
      case "skuAttributeName":
        setSKUAttributes(
          skuAttributes.map((a, i) =>
            i !== index ? a : { ...a, name: e.currentTarget.value }
          )
        );
        break;
      case "skuAttributeFilterable" + index:
        setSKUAttributes(
          skuAttributes.map((a, i) =>
            i !== index ? a : { ...a, isFilterable: e.currentTarget.checked }
          )
        );
        break;
      case "skuAttributeVariantsBasis" + index:
        setSKUAttributes(
          skuAttributes.map((a, i) =>
            i !== index ? a : { ...a, variantsBasis: e.currentTarget.checked }
          )
        );
        break;

      default:
        break;
    }
  };

  // sku attribute value change handler
  const skuAttributeValueChangeHandler = (
    e: React.FormEvent<HTMLInputElement>,
    attributeIndex: number,
    valueIndex: number
  ) => {
    if (attributeIndex < 0 || attributeIndex >= skuAttributes.length) return;
    if (
      valueIndex < 0 ||
      valueIndex >= skuAttributes[attributeIndex].values.length
    )
      return;
    switch (e.currentTarget.name) {
      case "skuAttributeValueName" + attributeIndex + "" + valueIndex:
        setSKUAttributes(
          skuAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex ? v : { ...v, name: e.currentTarget.value }
                  ),
                }
          )
        );
        break;
      case "skuAttributeValueSKU" + attributeIndex + "" + valueIndex:
        setSKUAttributes(
          skuAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex
                      ? v
                      : { ...v, sku: e.currentTarget.value.toUpperCase() }
                  ),
                }
          )
        );
        break;
      case "skuAttributeValueValueType" + attributeIndex + "" + valueIndex:
        setSKUAttributes(
          skuAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex
                      ? v
                      : { ...v, valueType: e.currentTarget.value }
                  ),
                }
          )
        );
        break;
      case "skuAttributeValueValue" + attributeIndex + "" + valueIndex:
        setSKUAttributes(
          skuAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex
                      ? v
                      : { ...v, value: e.currentTarget.value }
                  ),
                }
          )
        );
        break;

      default:
        break;
    }
  };

  //addAttribute
  const addAttribute = () => {
    setAttributes((attributes) => {
      return [
        ...attributes,
        {
          name: "",
          isMultiValued: false,
          isCompulsory: false,
          isFilterable: false,
          values: [{ name: "", valueType: "none", value: "" }],
        },
      ];
    });
  };

  //add attribute value
  const addAttributeValue = (attributeIndex: number) => {
    setAttributes((attributes) =>
      attributes.map((a, i) =>
        i !== attributeIndex
          ? a
          : {
              ...a,
              values: [...a.values, { name: "", valueType: "none", value: "" }],
            }
      )
    );
  };

  //removeAttribute
  const removeAttribute = (index: number) => {
    setAttributes((attributes) => {
      return attributes.filter((_, i) => i !== index);
    });
  };

  //remove attribute value
  const removeAttributeValue = (attributeIndex: number, valueIndex: number) => {
    setAttributes((attributes) => {
      return attributes.map((a, i) =>
        i !== attributeIndex
          ? a
          : { ...a, values: a.values.filter((_, j) => j !== valueIndex) }
      );
    });
  };

  //attributeChangeHandler
  const attributeChange = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index < 0 || index >= attributes.length) return;
    switch (e.currentTarget.name) {
      case "attributeName":
        setAttributes(
          attributes.map((a, i) =>
            i !== index ? a : { ...a, name: e.currentTarget.value }
          )
        );
        break;
      case "attributeCompulsory" + index:
        setAttributes(
          attributes.map((a, i) =>
            i !== index ? a : { ...a, isCompulsory: e.currentTarget.checked }
          )
        );
        break;
      case "attributeMultivalued" + index:
        setAttributes(
          attributes.map((a, i) =>
            i !== index ? a : { ...a, isMultiValued: e.currentTarget.checked }
          )
        );
        break;
      case "attributeFilterable" + index:
        setAttributes(
          attributes.map((a, i) =>
            i !== index ? a : { ...a, isFilterable: e.currentTarget.checked }
          )
        );
        break;

      default:
        break;
    }
  };

  //attribute value change handler
  //attributeChangeHandler
  const attributeValueChange = (
    e: React.FormEvent<HTMLInputElement>,
    attributeIndex: number,
    valueIndex: number
  ) => {
    if (attributeIndex < 0 || attributeIndex >= attributes.length) return;
    if (
      valueIndex < 0 ||
      valueIndex >= attributes[attributeIndex].values.length
    )
      return;
    switch (e.currentTarget.name) {
      case "attributeValueName" + attributeIndex + "" + valueIndex:
        setAttributes(
          attributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex ? v : { ...v, name: e.currentTarget.value }
                  ),
                }
          )
        );
        break;
      case "attributeValueValueType" + attributeIndex + "" + valueIndex:
        setAttributes(
          attributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex
                      ? v
                      : { ...v, valueType: e.currentTarget.value }
                  ),
                }
          )
        );
        break;
      case "attributeValueValue" + attributeIndex + "" + valueIndex:
        setAttributes(
          attributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex
                      ? v
                      : { ...v, value: e.currentTarget.value }
                  ),
                }
          )
        );
        break;

      default:
        break;
    }
  };

  //addOptionAttribute
  const addOptionAttribute = () => {
    setOptionAttributes((optionAttributes) => {
      return [
        ...optionAttributes,
        {
          name: "",
          values: [{ name: "", valueType: "none", value: "", sku: "" }],
        },
      ];
    });
  };

  //add option attribute value
  //add sku attribute value
  const addOptionAttributeValue = (index: number) => {
    setOptionAttributes((optionAttributes) => {
      return optionAttributes.map((a, i) =>
        i !== index
          ? a
          : {
              ...a,
              values: [
                ...a.values,
                { name: "", sku: "", valueType: "none", value: "" },
              ],
            }
      );
    });
  };

  //removeOptionAttribute
  const removeOptionAttribute = (index: number) => {
    setOptionAttributes((optionAttributes) => {
      return optionAttributes.filter((_, i) => i !== index);
    });
  };

  //remove option attribute value
  const removeOptionAttributeValue = (
    attributeIndex: number,
    valueIndex: number
  ) => {
    setOptionAttributes((optionAttributes) => {
      return optionAttributes.map((a, i) =>
        i !== attributeIndex
          ? a
          : { ...a, values: a.values.filter((_, j) => j !== valueIndex) }
      );
    });
  };

  //optionAttributeChangeHandler
  const optionAttributeChange = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index < 0 || index >= optionAttributes.length) return;
    switch (e.currentTarget.name) {
      case "optionAttributeName":
        setOptionAttributes(
          optionAttributes.map((a, i) =>
            i !== index ? a : { ...a, name: e.currentTarget.value }
          )
        );
        break;
      default:
        break;
    }
  };

  //option attribute value change handler
  const optionAttributeValueChangeHandler = (
    e: React.FormEvent<HTMLInputElement>,
    attributeIndex: number,
    valueIndex: number
  ) => {
    if (attributeIndex < 0 || attributeIndex >= optionAttributes.length) return;
    if (
      valueIndex < 0 ||
      valueIndex >= optionAttributes[attributeIndex].values.length
    )
      return;
    switch (e.currentTarget.name) {
      case "optionAttributeValueName" + attributeIndex + "" + valueIndex:
        setOptionAttributes(
          optionAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex ? v : { ...v, name: e.currentTarget.value }
                  ),
                }
          )
        );
        break;
      case "optionAttributeValueSKU" + attributeIndex + "" + valueIndex:
        setOptionAttributes(
          optionAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex ? v : { ...v, sku: e.currentTarget.value }
                  ),
                }
          )
        );
        break;
      case "optionAttributeValueValueType" + attributeIndex + "" + valueIndex:
        setOptionAttributes(
          optionAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex
                      ? v
                      : { ...v, valueType: e.currentTarget.value }
                  ),
                }
          )
        );
        break;
      case "optionAttributeValueValue" + attributeIndex + "" + valueIndex:
        setOptionAttributes(
          optionAttributes.map((a, i) =>
            i !== attributeIndex
              ? a
              : {
                  ...a,
                  values: a.values.map((v, j) =>
                    j !== valueIndex
                      ? v
                      : { ...v, value: e.currentTarget.value }
                  ),
                }
          )
        );
        break;

      default:
        break;
    }
  };
  //check for errors
  let errors: string[] = [];

  let valid = true;

  if (typeSku.value === "-") {
    valid = false;
    errors.push("Type has not been selected");
  }
  if (sku.value.length === 0) {
    valid = false;
    errors.push("SKU is empty");
  } else {
    sku.value = sku.value.toUpperCase();
    for (let i = 0; i < types.length; i++) {
      if (types[i].subtypes?.some((s) => s.sku === sku.value)) {
        valid = false;
        errors.push("SKU is already in use.");
      }
    }
  }
  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  }

  skuAttributes.forEach((skuAttribute, i) => {
    if (skuAttribute.name.length === 0) {
      valid = false;
      errors.push(`${i + 1} SKU attribute has empty name.`);
    }
    skuAttribute.values.forEach((skuAttributeValue, j) => {
      if (skuAttributeValue.name.length === 0) {
        valid = false;
        errors.push(
          `${j + 1} SKU attribute value of ${
            i + 1
          } SKU attribute has empty name.`
        );
      }
      if (skuAttributeValue.sku.length === 0) {
        valid = false;
        errors.push(
          `${j + 1} SKU attribute value of ${
            i + 1
          } SKU attribute has empty sku.`
        );
      }
      if (
        skuAttributeValue.valueType !== "none" &&
        skuAttributeValue.value.length === 0
      ) {
        valid = false;
        errors.push(
          `${j + 1} SKU attribute value of ${
            i + 1
          } SKU attribute has empty value`
        );
      }
    });
  });

  attributes.forEach((attribute, i) => {
    if (attribute.name.length === 0) {
      valid = false;
      errors.push(`${i + 1} Attribute has empty name.`);
    }
    attribute.values.forEach((attributeValue, j) => {
      if (attributeValue.name.length === 0) {
        valid = false;
        errors.push(
          `${j + 1} Attribute value of ${i + 1} Attribute has empty name.`
        );
      }
      if (
        attributeValue.valueType !== "none" &&
        attributeValue.value.length === 0
      ) {
        valid = false;
        errors.push(
          `${j + 1} Attribute value of ${i + 1} Attribute has empty value`
        );
      }
    });
  });

  optionAttributes.forEach((optionAttribute, i) => {
    if (optionAttribute.name.length === 0) {
      valid = false;
      errors.push(`${i + 1} Option attribute has empty name.`);
    }
    optionAttribute.values.forEach((optionAttributeValue, j) => {
      if (optionAttributeValue.name.length === 0) {
        valid = false;
        errors.push(
          `${j + 1} Option attribute value of ${
            i + 1
          } Option attribute has empty name.`
        );
      }
      if (optionAttributeValue.sku.length === 0) {
        valid = false;
        errors.push(
          `${j + 1} Option attribute value of ${
            i + 1
          } Option attribute has empty sku.`
        );
      }
      if (
        optionAttributeValue.valueType !== "none" &&
        optionAttributeValue.value.length === 0
      ) {
        valid = false;
        errors.push(
          `${j + 1} Option attribute value of ${
            i + 1
          } Option attribute has empty value`
        );
      }
    });
  });

  return (
    <>
      <FormWithGuidesAndErrors
        heading="Subtype Form : "
        guides={[
          <span>Selecting type from the dropdown is compulsory.</span>,
          <span>Name and SKU both are compulsory.</span>,
          <span>
            SKU should be unique. No two subtypes can have the same SKU.
          </span>,
          <span>At least one sku attribute must be given.</span>,
        ]}
        errors={errors}
        valid={valid}
        onSubmit={() =>
          createSubtype(
            sku.value,
            name.value,
            typeSku.value,
            attributes,
            skuAttributes,
            optionAttributes
          )
        }
      >
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
          <Col sm="2">Name:</Col>
          <Col>
            <FormGroup>
              <Input id="nameInput" name="name" type="text" {...name} />
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
        <Row className="mt-5">
          <Col>
            SKU Attributes: (Add in the same order that you want to see in
            product SKU)
          </Col>
          <Col
            onClick={addSKUAttribute}
            style={{ cursor: "pointer" }}
            className="text-blue"
          >
            <i className="ni ni-fat-add mr-3" />
            Add SKU Attribute
          </Col>
        </Row>
        {skuAttributes.map((a, i) => (
          <Row key={i} className="mt-4">
            <Col sm="1">
              <Button onClick={() => removeSKUAttribute(i)}>
                <i className="ni ni-fat-remove text-red" />
              </Button>
            </Col>
            <Col>
              <Row className="mt-4 align-items-center">
                <Col sm="1.2">
                  <label>SKU Order : {a.skuOrdering}</label>
                </Col>
                <Col className="mr-4">
                  <Input
                    name="skuAttributeName"
                    type="text"
                    value={a.name}
                    onChange={(e) => {
                      skuAttributeChangeHandler(e, i);
                    }}
                    placeholder="Name"
                  />
                </Col>
                <Col>
                  <Input
                    className="custom-control-input"
                    id={"skuAttributeFilterable" + i}
                    name={"skuAttributeFilterable" + i}
                    type="checkbox"
                    checked={a.isFilterable}
                    onChange={(e) => {
                      skuAttributeChangeHandler(e, i);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={"skuAttributeFilterable" + i}
                  >
                    Is Filterable
                  </label>
                </Col>
                <Col>
                  <input
                    className="custom-control-input"
                    id={"skuAttributeVariantsBasis" + i}
                    name={"skuAttributeVariantsBasis" + i}
                    type="checkbox"
                    checked={a.variantsBasis}
                    onChange={(e) => {
                      skuAttributeChangeHandler(e, i);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={"skuAttributeVariantsBasis" + i}
                  >
                    Variants Basis
                  </label>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col sm="1">Values:</Col>
                <Col
                  onClick={() => addSKUAttributeValue(i)}
                  style={{ cursor: "pointer" }}
                  className="text-blue"
                >
                  <i className="ni ni-fat-add mr-3" />
                  Add SKU Attribute Value
                </Col>
              </Row>
              {a.values.map((v, j) => (
                <Row className="mt-4">
                  <Col sm="1">
                    <Button onClick={() => removeSKUAttributeValue(i, j)}>
                      <i className="ni ni-fat-remove text-red" />
                    </Button>
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"skuAttributeValueName" + i + "" + j}
                      type="text"
                      value={v.name}
                      onChange={(e) => {
                        skuAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="Name"
                    />
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"skuAttributeValueSKU" + i + "" + j}
                      type="text"
                      value={v.sku}
                      onChange={(e) => {
                        skuAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="SKU"
                    />
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"skuAttributeValueValueType" + i + "" + j}
                      type="select"
                      value={v.valueType}
                      onChange={(e) => {
                        skuAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="Name"
                    >
                      <option value="none">none</option>
                      <option value="hexcode">hexcode</option>
                    </Input>
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"skuAttributeValueValue" + i + "" + j}
                      type="text"
                      value={v.value}
                      onChange={(e) => {
                        skuAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="Value"
                      disabled={v.valueType === "none"}
                    />
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        ))}
        <hr className="my-3 mt-5" />
        <Row className="mt-4">
          <Col>Attributes:</Col>
          <Col
            onClick={addAttribute}
            style={{ cursor: "pointer" }}
            className="text-blue"
          >
            <i className="ni ni-fat-add mr-3" />
            Add Attribute
          </Col>
        </Row>
        {attributes.map((a, i) => (
          <Row key={i} className="mt-4">
            <Col sm="1">
              <Button onClick={() => removeAttribute(i)}>
                <i className="ni ni-fat-remove text-red" />
              </Button>
            </Col>
            <Col>
              <Row className="align-items-center">
                <Col className="mr-4">
                  <Input
                    id="nameInput"
                    name="attributeName"
                    type="text"
                    value={a.name}
                    onChange={(e) => {
                      attributeChange(e, i);
                    }}
                    placeholder="Name"
                  />
                </Col>
                <Col>
                  <input
                    className="custom-control-input"
                    id={"attributeCompulsory" + i}
                    name={"attributeCompulsory" + i}
                    type="checkbox"
                    checked={a.isCompulsory}
                    onChange={(e) => {
                      attributeChange(e, i);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={"attributeCompulsory" + i}
                  >
                    Is Compulsory
                  </label>
                </Col>
                <Col>
                  <input
                    className="custom-control-input"
                    id={"attributeFilterable" + i}
                    name={"attributeFilterable" + i}
                    type="checkbox"
                    checked={a.isFilterable}
                    onChange={(e) => {
                      attributeChange(e, i);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={"attributeFilterable" + i}
                  >
                    Is Filterable
                  </label>
                </Col>
                <Col>
                  <input
                    className="custom-control-input"
                    id={"attributeMultivalued" + i}
                    name={"attributeMultivalued" + i}
                    type="checkbox"
                    checked={a.isMultiValued}
                    onChange={(e) => {
                      attributeChange(e, i);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={"attributeMultivalued" + i}
                  >
                    Is Multi Valued
                  </label>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col sm="1">Values:</Col>
                <Col
                  onClick={() => addAttributeValue(i)}
                  style={{ cursor: "pointer" }}
                  className="text-blue"
                >
                  <i className="ni ni-fat-add mr-3" />
                  Add Attribute Value
                </Col>
              </Row>
              {a.values.map((v, j) => (
                <Row className="mt-4">
                  <Col sm="1">
                    <Button onClick={() => removeAttributeValue(i, j)}>
                      <i className="ni ni-fat-remove text-red" />
                    </Button>
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"attributeValueName" + i + "" + j}
                      type="text"
                      value={v.name}
                      onChange={(e) => {
                        attributeValueChange(e, i, j);
                      }}
                      placeholder="Name"
                    />
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"attributeValueValueType" + i + "" + j}
                      type="select"
                      value={v.valueType}
                      onChange={(e) => {
                        attributeValueChange(e, i, j);
                      }}
                      placeholder="Name"
                    >
                      <option value="none">none</option>
                      <option value="hexcode">hexcode</option>
                    </Input>
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"attributeValueValue" + i + "" + j}
                      type="text"
                      value={v.value}
                      onChange={(e) => {
                        attributeValueChange(e, i, j);
                      }}
                      placeholder="Value"
                      disabled={v.valueType === "none"}
                    />
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        ))}

        <hr className="my-3 mt-5" />
        <Row className="mt-4">
          <Col>Option Attributes:</Col>
          <Col
            onClick={addOptionAttribute}
            style={{ cursor: "pointer" }}
            className="text-blue"
          >
            <i className="ni ni-fat-add mr-3" />
            Add Option Attribute
          </Col>
        </Row>
        {optionAttributes.map((a, i) => (
          <Row key={i} className="mt-4">
            <Col sm="1">
              <Button onClick={() => removeOptionAttribute(i)}>
                <i className="ni ni-fat-remove text-red" />
              </Button>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Input
                    name="optionAttributeName"
                    type="text"
                    value={a.name}
                    onChange={(e) => {
                      optionAttributeChange(e, i);
                    }}
                    placeholder="Name"
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col sm="1">Values:</Col>
                <Col
                  onClick={() => addOptionAttributeValue(i)}
                  style={{ cursor: "pointer" }}
                  className="text-blue"
                >
                  <i className="ni ni-fat-add mr-3" />
                  Add Option Attribute Value
                </Col>
              </Row>
              {a.values.map((v, j) => (
                <Row className="mt-4">
                  <Col sm="1">
                    <Button onClick={() => removeOptionAttributeValue(i, j)}>
                      <i className="ni ni-fat-remove text-red" />
                    </Button>
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"optionAttributeValueName" + i + "" + j}
                      type="text"
                      value={v.name}
                      onChange={(e) => {
                        optionAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="Name"
                    />
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"optionAttributeValueSKU" + i + "" + j}
                      type="text"
                      value={v.sku}
                      onChange={(e) => {
                        optionAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="SKU"
                    />
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"optionAttributeValueValueType" + i + "" + j}
                      type="select"
                      value={v.valueType}
                      onChange={(e) => {
                        optionAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="Name"
                    >
                      <option value="none">none</option>
                      <option value="hexcode">hexcode</option>
                    </Input>
                  </Col>
                  <Col className="mr-4">
                    <Input
                      name={"optionAttributeValueValue" + i + "" + j}
                      type="text"
                      value={v.value}
                      onChange={(e) => {
                        optionAttributeValueChangeHandler(e, i, j);
                      }}
                      placeholder="Value"
                      disabled={v.valueType === "none"}
                    />
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        ))}
        <hr className="my-3 mt-5" />
      </FormWithGuidesAndErrors>
    </>
  );
};

export default SubtypeCreate;
