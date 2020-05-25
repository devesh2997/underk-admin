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
import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";
import { useFormInput } from "hooks/Index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { beautifyName } from "utils";

const animatedComponents = makeAnimated();

type AdminCreateProps = {
  createAdmin: (data: {
    alias: string;
    password: string;
    euid: string;
    policyNames: string;
    roleIds: string;
  }) => Promise<void>;
  roles: Role[];
  policies: Policy[];
  employees: Employee[];
};

const AdminCreate: React.FC<AdminCreateProps> = ({
  createAdmin,
  roles,
  policies,
  employees,
}) => {
  const alias = useFormInput("");
  const password = useFormInput("");
  const euid = useFormInput("");
  const [roleIds, setRoleIds] = useState<number[]>([]);
  const [policyNames, setPolicyNames] = useState<string[]>([]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    createAdmin({
      alias: alias.value,
      password: password.value,
      euid: euid.value,
      roleIds: JSON.stringify(roleIds),
      policyNames: JSON.stringify(policyNames),
    });
  }

  return (
    <Container>
      <Form className="mt-3" onSubmit={onSubmit}>
        <FormGroup row>
          <Label sm={2}>Alias</Label>
          <Col sm={5}>
            <Input type="text" placeholder="Enter here" {...alias} required />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Password</Label>
          <Col sm={5}>
            <Input
              type="password"
              placeholder="Enter here"
              {...password}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Employee Profile</Label>
          <Col sm={10}>
            <Input type="select" {...euid}>
              <option value="">Select...</option>
              {employees.map((employee) => (
                <option value={employee.euid}>{`${beautifyName(
                  employee.firstName,
                  employee.lastName
                )} <${employee.email}>`}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Roles</Label>
          <Col sm={10}>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={roles.map((role) => ({
                value: role.id,
                label: role.name,
              }))}
              onChange={(opts) => {
                if (opts) {
                  setRoleIds(
                    opts.map(
                      (opt: { value: number; label: string }) => opt.value
                    )
                  );
                } else {
                  setRoleIds([]);
                }
              }}
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

export default AdminCreate;
