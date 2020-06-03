import React from "react";
import { Address } from "models/shared/Address";
import { Warehouse } from "models/inventory/Warehouse";
import { useFormInput, useAddressForm } from "hooks/Index";
import { validateAddress } from "utils";
import { FormWithGuidesAndErrors, CustomInputLabel } from "components/Widgets";
import { Row, FormGroup, Col, Input } from "reactstrap";
import AddressForm from "components/Widgets/AddressForm";

type Props = {
  create: (name: string, code: string, address: Address) => Promise<void>;
  warehouses: Warehouse[] | undefined;
};

const WarehouseCreate: React.FC<Props> = (props: Props) => {
  const { create, warehouses } = props;
  const code = useFormInput("");
  const name = useFormInput("");
  const { address, setAddress } = useAddressForm({
    building: "",
    landmark: "",
    locality: "",
    city: "",
    state: "",
    pincode: 0,
  });

  let errors: string[] = [];
  let valid = true;

  if (code.value.length === 0) {
    valid = false;
    errors.push("Code is empty");
  } else {
    if (warehouses?.some((c) => c.code === code.value)) {
      valid = false;
      errors.push("Code is already in use");
    }
  }
  if (name.value.length === 0) {
    valid = false;
    errors.push("Name is empty");
  } else {
    if (warehouses?.some((c) => c.name === name.value)) {
      valid = false;
      errors.push("Name is already in use");
    }
  }
  const addressValidation = validateAddress(address);
  if (!addressValidation.valid) {
    valid = false;
    errors.push(("Address : " + addressValidation.error) as string);
  }

  return (
    <FormWithGuidesAndErrors
      heading="Warehouse Form"
      errors={errors}
      valid={valid}
      onSubmit={() => create(name.value, code.value, address)}
    >
      <Row className="mt-3">
        <Col sm={2}>
          <CustomInputLabel mandatory>
            Code
          </CustomInputLabel>
        </Col>
        <Col sm={5}>
          <Input type="text" placeholder="Enter code" {...code} required />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={2}>
          <CustomInputLabel mandatory>
            Name
          </CustomInputLabel>
        </Col>
        <Col sm={5}>
          <Input type="text" placeholder="Enter name" {...name} required />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={2}>
          <CustomInputLabel mandatory>
            Address
          </CustomInputLabel>
        </Col>
        <Col>
          <AddressForm address={address} setAddress={setAddress}/>
        </Col>
      </Row>
    </FormWithGuidesAndErrors>
  );
};

export default WarehouseCreate;
