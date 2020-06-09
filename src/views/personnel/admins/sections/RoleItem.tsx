import React, { useState, useRef, useEffect } from "react";
import Role from "models/Role";
import {
  RoleDeleteByIdFunc,
  RoleAddPolicyFunc,
  RoleDeletePolicyFunc,
} from "data/RoleRepository";
import Policy from "models/Policy";
import {
  Badge,
  Button,
  Modal,
  Form,
  FormGroup,
  Label,
  UncontrolledAlert,
} from "reactstrap";
import { ConfirmButton, LoadingButton } from "components/Widgets";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

type RoleItemProps = {
  role: Role;
  deleteRole: RoleDeleteByIdFunc;
  policies: Policy[];
  addPoliciesToRole: RoleAddPolicyFunc;
  deletePoliciesFromRole: RoleDeletePolicyFunc;
};

type PolicyOpt = {
  value: string;
  label: string;
};

const RoleItem: React.FC<RoleItemProps> = ({
  role,
  deleteRole,
  policies,
  addPoliciesToRole,
  deletePoliciesFromRole,
}) => {
  const isMounted = useRef(true);

  const [isModalOpen, toggleModal] = useState(false);
  const [selectedOpts, setSelectedOpts] = useState<PolicyOpt[]>(
    role.policies.map((policy) => ({ value: policy.name, label: policy.name }))
  );
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    isMounted.current && toggleLoading(true);
    isMounted.current && setError("");

    const finalPolicies = selectedOpts.map((opt) => opt.value);
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
      isMounted.current && setError(result1.error);
    } else if (result2.isErr()) {
      isMounted.current && setError(result2.error);
    } else {
      isMounted.current && toggleModal(false);
    }

    isMounted.current && toggleLoading(false);
  }

  return (
    <tr>
      <td>{role.name}</td>
      <td>{role.description}</td>
      <td>
        {role.policies.map((policy) => (
          <Badge key={policy.id} color="info" pill>
            {policy.name}
          </Badge>
        ))}
      </td>
      <td>
        <Button
          color="secondary"
          size="sm"
          type="button"
          style={{ fontSize: "0.875rem" }}
          onClick={() => toggleModal(!isModalOpen)}
        >
          <i className="fas fa-edit"></i>
        </Button>
        <ConfirmButton
          color="danger"
          size="sm"
          type="button"
          style={{ fontSize: "0.875rem" }}
          confirmText={`Are you sure you want to remove ${role.name} from Roles?`}
          onConfirm={deleteRole.bind(null, role.id)}
          showLoading
        >
          <i className="fas fa-trash-alt"></i>
        </ConfirmButton>
      </td>
      <Modal
        className="modal-dialog-centered"
        isOpen={isModalOpen}
        toggle={() => toggleModal(!isModalOpen)}
        unmountOnClose
      >
        <div className="modal-header">
          <h4 className="modal-title">Edit Role {role.name}</h4>
          <button
            className="close"
            type="button"
            onClick={() => toggleModal(!isModalOpen)}
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="modal-body">
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Policies</Label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={policies.map((policy) => ({
                  value: policy.name,
                  label: policy.name,
                }))}
                value={selectedOpts}
                onChange={(opts) => {
                  if (opts) {
                    setSelectedOpts(opts as PolicyOpt[]);
                  } else {
                    setSelectedOpts([]);
                  }
                }}
              />
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
        </div>
      </Modal>
    </tr>
  );
};

export default RoleItem;
