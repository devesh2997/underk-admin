import React from "react";
import { Collection } from "models/catalogue/Collection";
import { CardBody, Card, Row, Col, CardHeader, Input } from "reactstrap";
import { useFormInput } from "hooks/Index";
import FormWithGuidesAndErrors from "components/Widgets/FormWithGuidesAndErrors";

type Props = {
  create: (name: string, slug: string) => Promise<void>;
  collections: Collection[] | undefined;
};

const CollectionCreate: React.FC<Props> = (props: Props) => {
  const { create, collections } = props;

  const name = useFormInput("");
  const slug = useFormInput("");

  let errors: string[] = [];
  let valid = true;

  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  }
  if (slug.value.length === 0) {
    valid = false;
    errors.push("Slug is empty");
  } else if (collections?.some((c) => c.slug === slug.value)) {
    valid = false;
    errors.push("Slug is already in use.");
  }

  return (
    <FormWithGuidesAndErrors
      heading="Collection Form"
      errors={errors}
      valid={valid}
      guides={[
        <span>Name and slug are compulsory.</span>,
        <span>
          slug is unique. No two collection should have the same slug.
        </span>,
        <span>
          If the collection has a parent, please select it from the dropdown
        </span>,
      ]}
      onSubmit={() => create(name.value, slug.value)}
    >
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
export default CollectionCreate;
