import React, { useRef, useState, useEffect } from "react";
import { ConfirmButton, LoadingButton } from "components/Widgets";
import {
  Badge,
  Button,
  Modal,
  Form,
  FormGroup,
  Label,
  UncontrolledAlert,
  Input,
  FormText,
} from "reactstrap";
import { beautifyDate, beautifyName } from "utils";
import Admin from "models/Admin";
import { AdminDeleteByIdFunc, AdminUpdateFunc } from "data/AdminRepository";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormInput } from "hooks/Index";
import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";

const animatedComponents = makeAnimated();

type AdminItemProps = {
  admin: Admin;
  deleteAdmin: AdminDeleteByIdFunc;
  employees: Employee[];
  roles: Role[];
  policies: Policy[];
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

const AdminItem: React.FC<AdminItemProps> = ({
  admin,
  deleteAdmin,
  employees,
  roles,
  policies,
  updateAdmin,
}) => {
  const isMounted = useRef(true);

  const [isModalOpen, toggleModal] = useState(false);
  const alias = useFormInput(admin.alias);
  const euid = useFormInput(admin.employee ? admin.employee.euid : "");
  const [selectedRoleOpts, setSelectedRoleOpts] = useState<RoleOpt[]>(
    admin.roles.map((role) => ({ value: role.id, label: role.name }))
  );
  const [selectedPolicyOpts, setSelectedPolicyOpts] = useState<PolicyOpt[]>(
    admin.policies.map((policy) => ({ value: policy.name, label: policy.name }))
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

    const result = await updateAdmin({
      auid: admin.auid,
      alias: admin.alias === alias.value ? undefined : alias.value,
      euid:
        (admin.employee ? admin.employee.euid : "") === euid.value
          ? undefined
          : euid.value,
      roleIds: JSON.stringify(selectedRoleOpts.map((opt) => opt.value)),
      policyNames: JSON.stringify(selectedPolicyOpts.map((opt) => opt.value)),
    });
    if (result.isErr()) {
      isMounted.current && setError(result.error);
    } else {
      isMounted.current && toggleModal(false);
    }

    isMounted.current && toggleLoading(false);
  }

  return (
    <tr>
      <td>{admin.alias}</td>
      <td>
        {admin.roles.map((role) => (
          <Badge key={role.id} color="primary" pill>
            {role.name}
          </Badge>
        ))}
      </td>
      <td>
        {admin.policies.map((policy) => (
          <Badge key={policy.name} color="info" pill>
            {policy.name}
          </Badge>
        ))}
      </td>
      <td>{beautifyDate(admin.created_at)}</td>
      <td>{beautifyDate(admin.updated_at)}</td>
      <td>
        <Button
          color="info"
          size="sm"
          type="button"
          style={{ fontSize: "0.875rem" }}
        >
          <i className="fas fa-id-card"></i>
        </Button>
        <Button
          color="secondary"
          size="sm"
          type="button"
          style={{ fontSize: "0.875rem" }}
          onClick={() => toggleModal(!isModalOpen)}
        >
          <i className="fas fa-user-edit"></i>
        </Button>
        <ConfirmButton
          color="danger"
          size="sm"
          type="button"
          style={{ fontSize: "0.875rem" }}
          confirmText={`Are you sure you want to remove ${admin.alias} from Admins?`}
          onConfirm={deleteAdmin.bind(null, admin.auid)}
          showLoading
        >
          <i className="fas fa-user-minus"></i>
        </ConfirmButton>
      </td>
      <Modal
        className="modal-dialog-centered"
        isOpen={isModalOpen}
        toggle={() => toggleModal(!isModalOpen)}
        unmountOnClose
      >
        <div className="modal-header">
          <h4 className="modal-title">Edit Admin {admin.alias}</h4>
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
              <Label>Alias</Label>
              <Input
                type="text"
                placeholder="Enter alias"
                {...alias}
                required
              />
              <FormText color="muted">
                Alias must be atleast 3 characters long
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label>Employee Profile</Label>
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
            </FormGroup>
            <FormGroup>
              <Label>Roles</Label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={roles.map((role) => ({
                  value: role.id,
                  label: role.name,
                }))}
                value={selectedRoleOpts}
                onChange={(opts) => {
                  if (opts) {
                    setSelectedRoleOpts(opts as RoleOpt[]);
                  } else {
                    setSelectedRoleOpts([]);
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label sm={2}>Policies</Label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={policies.map((policy) => ({
                  value: policy.name,
                  label: policy.name,
                }))}
                value={selectedPolicyOpts}
                onChange={(opts) => {
                  if (opts) {
                    setSelectedPolicyOpts(opts as PolicyOpt[]);
                  } else {
                    setSelectedPolicyOpts([]);
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

export default AdminItem;
