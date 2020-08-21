import React from "react";
import { Category } from "models/catalogue/Category";
import { CardBody, Card, Row, Col, CardHeader, Input } from "reactstrap";
import { useFormInput } from "hooks/Index";
import FormWithGuidesAndErrors from "components/Widgets/FormWithGuidesAndErrors";

type Props = {
  create: (
    name: string,
    slug: string,
    parentSlug: string
  ) => Promise<void>;
  categories: Category[] | undefined;
};

const CategoryCreate: React.FC<Props> = (props: Props) => {
  const { create, categories } = props;

  const name = useFormInput("");
  const slug = useFormInput("");
  const parentSlug = useFormInput("");

  let errors: string[] = [];
  let valid = true;

  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  }
  if (slug.value.length === 0) {
    valid = false;
    errors.push("Slug is empty");
  } else {
    if (categories?.some((c) => c.slug === slug.value)) {
      valid = false;
      errors.push("SLUG is already in use.");
    }
  }

  return (
    <FormWithGuidesAndErrors
      heading="Category Form"
      errors={errors}
      valid={valid}
      guides={[
        <span>Name, SKU and slug are all compulsory.</span>,
        <span>
          Slug is unique. No two category should have the same slug.
        </span>,
        <span>
          If the category has a parent, please select it from the dropdown
        </span>,
      ]}
      onSubmit={() =>
        create(
          name.value,
          slug.value,
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
        <Col sm="1">Slug : </Col>
        <Col>
          <Input {...slug} />
        </Col>
      </Row>
    </FormWithGuidesAndErrors>
  );
};
export default CategoryCreate;
