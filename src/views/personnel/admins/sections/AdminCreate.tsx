import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
  FormText,
  UncontrolledAlert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";
import { useFormInput } from "hooks/Index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { beautifyName } from "utils";
import { AdminCreateFunc } from "data/AdminRepository";
import { useHistory } from "react-router-dom";

const animatedComponents = makeAnimated();

type AdminCreateProps = {
  createAdmin: AdminCreateFunc;
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
  const isMounted = useRef(true);
  const history = useHistory();

  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const alias = useFormInput("");
  const password = useFormInput("");
  const euid = useFormInput("");
  const [roleIds, setRoleIds] = useState<number[]>([]);
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

    const result = await createAdmin({
      alias: alias.value,
      password: password.value,
      euid: euid.value,
      roleIds: JSON.stringify(roleIds),
      policyNames: JSON.stringify(policyNames),
    });
    if(result.isErr()) {
      isMounted.current && setError(result.error);
    } else {
      console.log("AdminCreate", result.value);
      history.push("/admin/personnel/admins");
    }

    isMounted.current && toggleLoading(false);
  }

  return (
    <Container>
      <Form className="mt-3" onSubmit={onSubmit}>
        <FormGroup row>
          <Label sm={2}>
            Alias <sup style={{ color: "red" }}>*</sup>
          </Label>
          <Col sm={5}>
            <Input type="text" placeholder="Enter alias" {...alias} required />
            <FormText color="muted">
              Alias must be atleast 3 characters long
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>
            Password <sup style={{ color: "red" }}>*</sup>
          </Label>
          <Col sm={5}>
            <InputGroup>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter password"
                {...password}
                required
              />
              <InputGroupAddon addonType="append">
                <InputGroupText
                  onClick={() => setPasswordVisibility(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <i className="far fa-eye-slash"></i>
                  ) : (
                    <i className="far fa-eye"></i>
                  )}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FormText color="muted">
              Password must be atleast 6 characters long
            </FormText>
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
        {error ? (
          <UncontrolledAlert color="danger">{error}</UncontrolledAlert>
        ) : null}
        <FormGroup className="text-center">
          <Button color="primary" type="submit" disabled={loading}>
            {loading ? (
              <span>
                <i className="fas fa-cog fa-spin" /> Creating
              </span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default AdminCreate;
