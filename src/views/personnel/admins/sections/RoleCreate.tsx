import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Col,
  Container,
  FormText,
  UncontrolledAlert,
} from "reactstrap";
import Policy from "models/Policy";
import { useFormInput } from "hooks/Index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { RoleCreateFunc } from "data/RoleRepository";
import { useHistory } from "react-router-dom";
import { CustomInputLabel, LoadingButton } from "components/Widgets";

const animatedComponents = makeAnimated();

type RoleCreateProps = {
  createRole: RoleCreateFunc;
  policies: Policy[];
};

const RoleCreate: React.FC<RoleCreateProps> = ({ createRole, policies }) => {
  const isMounted = useRef(true);
  const history = useHistory();

  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState("");

  const name = useFormInput("");
  const description = useFormInput("");
  const [policyNames, setPolicyNames] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    isMounted.current && toggleLoading(true);
    isMounted.current && setError("");

    const result = await createRole({
      name: name.value.toUpperCase(),
      description: description.value,
      policyNames: JSON.stringify(policyNames),
    });
    if (result.isErr()) {
      isMounted.current && setError(result.error);
    } else {
      console.log("RoleCreate", result.value);
      history.push("/admin/personnel/admins/roles");
    }

    isMounted.current && toggleLoading(false);
  }

  return (
    <Container>
      <Form className="mt-3" onSubmit={onSubmit}>
        <FormGroup row>
          <CustomInputLabel sm={2} mandatory>
            Name
          </CustomInputLabel>
          <Col sm={5}>
            <Input type="text" placeholder="Enter name" {...name} required />
            <FormText color="muted">
              Name should contain only uppercase letters
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <CustomInputLabel sm={2}>Description</CustomInputLabel>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Enter description"
              {...description}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <CustomInputLabel sm={2}>Policies</CustomInputLabel>
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
        {error ? (
          <UncontrolledAlert color="danger">{error}</UncontrolledAlert>
        ) : null}
        <FormGroup className="text-center">
          <LoadingButton color="primary" type="submit" loading={loading}>
            Submit
          </LoadingButton>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default RoleCreate;
