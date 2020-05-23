import React from "react";
import { Category } from "models/catalogue/Category";
import { CardBody, Card, Row, Col, CardHeader, Input } from "reactstrap";
import { useFormInput } from "hooks/Index";
import FormWithGuidesAndErros from "components/Widgets/FormWithGuidesAndErros";

type Props = {
  create: (
    name: string,
    slug: string,
    sku: string,
    parentSlug: string
  ) => Promise<void>;
  categories: Category[] | undefined;
};

const CategoryCreate: React.FC<Props> = (props: Props) => {
  const { create, categories } = props;

  const name = useFormInput("");
  const slug = useFormInput("");
  const sku = useFormInput("");
  const parentSlug = useFormInput("");

  let errors: string[] = [];
  let valid = true;

  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  }
  if (sku.value.length === 0) {
    valid = false;
    errors.push("SKU is empty");
  } else {
    sku.value = sku.value.toUpperCase();
  }
  if (slug.value.length === 0) {
    valid = false;
    errors.push("Slug is empty");
  }

  return (
    <FormWithGuidesAndErros
      heading="Category Form"
      errors={errors}
      valid={valid}
      guides={[
        <span>Name, SKU and slug are all compulsory.</span>,
        <span>
          SKU and slug are unique. No two category should have the same SKU or
          slug.
        </span>,
        <span>
          If the category has a parent, please select it from the dropdown
        </span>,
      ]}
      onSubmit={() =>
        create(
          name.value,
          slug.value,
          sku.value.toUpperCase(),
          parentSlug.value
        )
      }
    >
      <Row className="mt-3">
        <Col sm="1">Parent : </Col>
        <Col>
          <Input {...parentSlug} type="select">
            <option value="">-</option>
            {categories?.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Input>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm="1">Name : </Col>
        <Col>
          <Input {...name} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm="1">SKU : </Col>
        <Col>
          <Input {...sku} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm="1">Slug : </Col>
        <Col>
          <Input {...slug} />
        </Col>
      </Row>
    </FormWithGuidesAndErros>
  );
};
export default CategoryCreate;
