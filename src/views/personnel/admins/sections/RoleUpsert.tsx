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
import {
  RoleCreateFunc,
  RoleAddPolicyFunc,
  RoleDeletePolicyFunc,
} from "data/RoleRepository";
import { useHistory, useLocation } from "react-router-dom";
import { CustomInputLabel, LoadingButton } from "components/Widgets";
import Role from "models/Role";
import { ApiError } from "../../../../core/errors";

const animatedComponents = makeAnimated();

type RoleUpsertProps = {
  createRole: RoleCreateFunc;
  policies: Policy[];
  addPoliciesToRole: RoleAddPolicyFunc;
  deletePoliciesFromRole: RoleDeletePolicyFunc;
};

type PolicyOpt = {
  value: string;
  label: string;
};

const RoleUpsert: React.FC<RoleUpsertProps> = ({
  createRole,
  policies,
  addPoliciesToRole,
  deletePoliciesFromRole,
}) => {
  const isMounted = useRef(true);
  const history = useHistory();
  const location = useLocation<{ role?: Role } | null | undefined>();
  const role: Role | null | undefined = location.state?.role;

  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  const name = useFormInput(role ? role.name : "");
  const description = useFormInput(role ? role.description : "");
  const [selPolicyOpts, setSelPolicyOpts] = useState<PolicyOpt[]>(
    role
      ? role.policies.map((policy) => ({
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
    isMounted.current && setError(undefined);

    if (role) {
      const finalPolicies = selPolicyOpts.map((opt) => opt.value);
      const initialPolicies = role.policies.map((policy) => policy.name);

      const policiesToBeAdded = finalPolicies.filter(
        (policy) => !initialPolicies.includes(policy)
      );
      const policiesToBeDeleted = initialPolicies.filter(
        (policy) => !finalPolicies.includes(policy)
      );

      const result1 = await addPoliciesToRole({
        id: role.id,
        policyNames: JSON.stringify(policiesToBeAdded),
      });

      const result2 = await deletePoliciesFromRole({
        id: role.id,
        policyNames: JSON.stringify(policiesToBeDeleted),
      });

      if (result1.isErr()) {
        isMounted.current && setError(new ApiError(result1.error));
      } else if (result2.isErr()) {
        isMounted.current && setError(new ApiError(result2.error));
      } else {
        console.log("RoleUpdate", result1.value, result2.value);
        history.push("/admin/personnel/admins/roles");
      }
    } else {
      const result = await createRole({
        name: name.value.toUpperCase(),
        description: description.value,
        policyNames: JSON.stringify(selPolicyOpts.map((opt) => opt.value)),
      });
      if (result.isErr()) {
        isMounted.current && setError(new ApiError(result.error));
      } else {
        console.log("RoleInsert", result.value);
        history.push("/admin/personnel/admins/roles");
      }
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
            <Input
              type="text"
              placeholder="Enter name"
              {...name}
              required
              disabled={!!role}
            />
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
              disabled={!!role}
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

export default RoleUpsert;
