import React, { useState } from "react";
import { Supplier } from "models/inventory/Supplier";
import { SupplierCreateInfo } from "data/inventory/SupplierRepository";
import { useFormInput } from "hooks/Index";
import { FormWithGuidesAndErrors, CustomInputLabel } from "components/Widgets";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ReactDatetime from "react-datetime";

type Props = {
  suppliers: Supplier[];
  create: (supplierCreateInfo: SupplierCreateInfo) => Promise<void>;
};

const SupplierCreate: React.FC<Props> = (props: Props) => {
  const { suppliers, create } = props;

  const sku = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const mobileNumber = useFormInput("");
  const mobileCountryCode = useFormInput("+91");
  const email = useFormInput("");
  const gender = useFormInput("N");
  const [dob, setDob] = useState<Date>();
  const address = useFormInput("");

  let errors: string[] = [];

  let valid = true;
  if (sku.value.length === 0) {
    valid = false;
    errors.push("Please enter SKU");
  }
  if (firstName.value.length === 0) {
    valid = false;
    errors.push("Please enter first name");
  }
  if (typeof dob === "undefined") {
    valid = false;
    errors.push("Please enter dob.");
  }
  if (mobileNumber.value.length === 0) {
    valid = false;
    errors.push("Please enter mobile number");
  }
  if (mobileNumber.value.length === 0) {
    valid = false;
    errors.push("Please enter email.");
  }
  if (mobileNumber.value.length > 0) {
    if (isNaN(Number(mobileNumber.value))) {
      valid = false;
      errors.push("Mobile number should only contain digits");
    }
    if (mobileNumber.value.length !== 10) {
      valid = false;
      errors.push("Invalid mobile number length");
    }
  }
  if (address.value.length === 0) {
    valid = false;
    errors.push("Please enter address.");
  }

  return (
    <FormWithGuidesAndErrors
      heading="Supplier Form"
      valid={valid}
      errors={errors}
      onSubmit={() =>
        create({
          sku: sku.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          mobileCountryCode: mobileCountryCode.value,
          mobileNumber: Number(mobileNumber.value),
          dob: dob as Date,
          address: address.value,
          gender: gender.value,
        })
      }
    >
      <Row className="mt-3">
        <CustomInputLabel sm={2} mandatory>
          SKU
        </CustomInputLabel>
        <Col sm={5}>
          <Input type="text" placeholder="Enter sku" {...sku} required />
        </Col>
      </Row>
      <Row className="mt-3">
        <CustomInputLabel sm={2} mandatory>
          Name
        </CustomInputLabel>
        <Col>
          <Input
            type="text"
            placeholder="Enter first name"
            {...firstName}
            required
          />
        </Col>
        <Col>
          <Input
            type="text"
            placeholder="Enter last name"
            {...lastName}
            required
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <CustomInputLabel sm={2} mandatory>
          Email
        </CustomInputLabel>
        <Col sm={5}>
          <Input type="email" placeholder="Enter email" {...email} required />
        </Col>
      </Row>
      <Row className="mt-3">
        <CustomInputLabel sm={2} mandatory>
          Address
        </CustomInputLabel>
        <Col sm={5}>
          <Input
            type="email"
            placeholder="Enter address"
            {...address}
            required
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <CustomInputLabel sm={2} mandatory>
          Mobile
        </CustomInputLabel>
        <Col sm="1">
          <Input type="select" {...mobileCountryCode}>
            <option value="+91">+91</option>
          </Input>
        </Col>
        <Col>
          <Input type="text" placeholder="1234567890" {...mobileNumber} />
        </Col>
      </Row>
      <Row className="mt-3">
        <CustomInputLabel sm={2} mandatory>
          Gender
        </CustomInputLabel>
        <Col>
          <div className="custom-control custom-radio mb-3">
            <input
              className="custom-control-input"
              id="maleRadio"
              name="gender-radio"
              type="radio"
              value="M"
              onChange={gender.onChange}
            />
            <label className="custom-control-label" htmlFor="maleRadio">
              Male
            </label>
          </div>
        </Col>
        <Col>
          <div className="custom-control custom-radio mb-3">
            <input
              className="custom-control-input"
              id="femaleRadio"
              name="gender-radio"
              type="radio"
              value="F"
              onChange={gender.onChange}
            />
            <label className="custom-control-label" htmlFor="femaleRadio">
              Female
            </label>
          </div>
        </Col>
        <Col>
          <div className="custom-control custom-radio mb-3">
            <input
              className="custom-control-input"
              defaultChecked
              id="noneRadio"
              name="gender-radio"
              type="radio"
              value="N"
              onChange={gender.onChange}
            />
            <label className="custom-control-label" htmlFor="noneRadio">
              None
            </label>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <CustomInputLabel sm={2} mandatory>
          DOB
        </CustomInputLabel>
        <Col>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-calendar-grid-58" />
              </InputGroupText>
            </InputGroupAddon>
            <ReactDatetime
              inputProps={{
                placeholder: "Date Picker Here",
              }}
              timeFormat={false}
              value={dob}
              closeOnSelect={true}
              onChange={(v) => {
                setDob(new Date(v.toString()));
              }}
            />
          </InputGroup>
        </Col>
      </Row>
    </FormWithGuidesAndErrors>
  );
};

export default SupplierCreate;
