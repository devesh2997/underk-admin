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
import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";
import { useFormInput } from "hooks/Index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { beautifyName } from "utils";
import { AdminCreateFunc } from "data/AdminRepository";
import { useHistory } from "react-router-dom";
import {
  LoadingButton,
  PasswordInput,
  CustomInputLabel,
} from "components/Widgets";

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
    if (result.isErr()) {
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
          <CustomInputLabel sm={2} mandatory>
            Alias
          </CustomInputLabel>
          <Col sm={5}>
            <Input type="text" placeholder="Enter alias" {...alias} required />
            <FormText color="muted">
              Alias must be atleast 3 characters long
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <CustomInputLabel sm={2} mandatory>
            Password
          </CustomInputLabel>
          <Col sm={5}>
            <PasswordInput
              placeholder="Enter password"
              {...password}
              required
            />
            <FormText color="muted">
              Password must be atleast 6 characters long
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <CustomInputLabel sm={2}>Employee Profile</CustomInputLabel>
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
          <CustomInputLabel sm={2}>Roles</CustomInputLabel>
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

export default AdminCreate;
