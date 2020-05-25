import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
} from "reactstrap";
import Policy from "models/Policy";
import { useFormInput } from "hooks/Index";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

type RoleCreateProps = {
  createRole: (data: {
    name: string;
    description: string;
    policyNames: string;
  }) => Promise<void>;
  policies: Policy[];
};

const RoleCreate: React.FC<RoleCreateProps> = ({ createRole, policies }) => {
  const name = useFormInput("");
  const description = useFormInput("");
  const [policyNames, setPolicyNames] = useState<string[]>([]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    createRole({
      name: name.value,
      description: description.value,
      policyNames: JSON.stringify(policyNames),
    });
  }

  return (
    <Container>
      <Form className="mt-3" onSubmit={onSubmit}>
        <FormGroup row>
          <Label sm={2}>Name</Label>
          <Col sm={5}>
            <Input type="text" placeholder="Enter name" {...name} required />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Description</Label>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Enter description"
              {...description}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Policies</Label>
          <Col sm={10}>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={policies.map((policy) => ({
                value: policy.name,
                label: policy.name,
              }))}
              onChange={(opts) => {
                if (opts) {
                  setPolicyNames(
                    opts.map(
                      (opt: { value: string; label: string }) => opt.value
                    )
                  );
                } else {
                  setPolicyNames([]);
                }
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup className="text-center">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default RoleCreate;
