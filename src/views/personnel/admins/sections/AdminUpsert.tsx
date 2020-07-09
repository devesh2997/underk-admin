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
import { AdminCreateFunc, AdminUpdateFunc } from "data/AdminRepository";
import { useHistory, useLocation } from "react-router-dom";
import {
  LoadingButton,
  PasswordInput,
  CustomInputLabel,
} from "components/Widgets";
import Admin from "models/Admin";
import { beautifyName } from "underk-utils";

const animatedComponents = makeAnimated();

type AdminUpsertProps = {
  createAdmin: AdminCreateFunc;
  roles: Role[];
  policies: Policy[];
  employees: Employee[];
  updateAdmin: AdminUpdateFunc;
};

type RoleOpt = {
  value: number;
  label: string;
};

type PolicyOpt = {
  value: string;
  label: string;
};

const AdminUpsert: React.FC<AdminUpsertProps> = ({
  createAdmin,
  roles,
  policies,
  employees,
  updateAdmin,
}) => {
  const isMounted = useRef(true);
  const history = useHistory();
  const location = useLocation<{ admin?: Admin } | null | undefined>();
  const admin: Admin | null | undefined = location.state?.admin;

  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState("");

  const alias = useFormInput(admin ? admin.alias : "");
  const password = useFormInput("");
  const euid = useFormInput(admin && admin.employee ? admin.employee.euid : "");
  const [selRoleOpts, setSelRoleOpts] = useState<RoleOpt[]>(
    admin
      ? admin.roles.map((role) => ({ value: role.id, label: role.name }))
      : []
  );
  const [selPolicyOpts, setSelPolicyOpts] = useState<PolicyOpt[]>(
    admin
      ? admin.policies.map((policy) => ({
          value: policy.name,
          label: policy.name,
        }))
      : []
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    isMounted.current && toggleLoading(true);
    isMounted.current && setError("");

    if (admin) {
      const result = await updateAdmin({
        auid: admin.auid,
        alias: admin.alias === alias.value ? undefined : alias.value,
        euid:
          (admin.employee ? admin.employee.euid : "") === euid.value
            ? undefined
            : euid.value,
        roleIds: JSON.stringify(selRoleOpts.map((opt) => opt.value)),
        policyNames: JSON.stringify(selPolicyOpts.map((opt) => opt.value)),
      });
      if (result.isErr()) {
        isMounted.current && setError(result.error);
      } else {
        console.log("AdminUpdate", result.value);
        history.push("/admin/personnel/admins");
      }
    } else {
      const result = await createAdmin({
        alias: alias.value,
        password: password.value,
        euid: euid.value,
        roleIds: JSON.stringify(selRoleOpts.map((opt) => opt.value)),
        policyNames: JSON.stringify(selPolicyOpts.map((opt) => opt.value)),
      });
      if (result.isErr()) {
        isMounted.current && setError(result.error);
      } else {
        console.log("AdminInsert", result.value);
        history.push("/admin/personnel/admins");
      }
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
              disabled={!!admin}
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
                <option
                  key={employee.euid}
                  value={employee.euid}
                >{`${beautifyName(employee.firstName, employee.lastName)} <${
                  employee.email
                }>`}</option>
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
              value={selRoleOpts}
              onChange={(opts) => {
                if (opts) {
                  setSelRoleOpts(opts as RoleOpt[]);
                } else {
                  setSelRoleOpts([]);
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
              value={selPolicyOpts}
              onChange={(opts) => {
                if (opts) {
                  setSelPolicyOpts(opts as PolicyOpt[]);
                } else {
                  setSelPolicyOpts([]);
                }
              }}
            />
          </Col>
        </FormGroup>
        {error ? (
          <UncontrolledAlert color="danger">
            <pre>{error}</pre>
          </UncontrolledAlert>
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

export default AdminUpsert;
