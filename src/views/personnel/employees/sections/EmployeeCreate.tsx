import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
  Col,
  Row,
  Container,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useFormInput } from "hooks/Index";
import ReactDatetime from "react-datetime";
import { EmployeeRepo } from "data/EmployeeRepository";

type EmployeeCreateProps = {
  employeeRepo: EmployeeRepo;
};

const EmployeeCreate: React.FC<EmployeeCreateProps> = ({ employeeRepo }) => {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const [emailVerified, setIsEmailVerified] = useState(false);
  const mobileCountryCode = useFormInput("+91");
  const mobileNumber = useFormInput("");
  const [mobileVerified, setIsMobileVerified] = useState(false);
  const [dob, setDob] = useState<Date>();
  const gender = useFormInput("N");
  const address = useFormInput("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    employeeRepo.createEmployee({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      mobileCountryCode: mobileCountryCode.value,
      mobileNumber: Number(mobileNumber.value),
      dob: dob?.getTime(),
      gender: gender.value,
      mobileVerified,
      emailVerified,
      address: address.value,
    });
  }

  return (
    <Container>
      <Form className="mt-3" onSubmit={onSubmit}>
        <FormGroup row>
          <Label sm={2}>Name</Label>
          <Col sm={5}>
            <Input
              type="text"
              placeholder="First Name"
              {...firstName}
              required
            />
          </Col>
          <Col sm={5}>
            <Input type="text" placeholder="Last Name" {...lastName} />
          </Col>
        </FormGroup>
        <Row className="align-items-center">
          <Col sm={8}>
            <FormGroup row>
              <Label sm={3}>Email</Label>
              <Col sm={9}>
                <Input
                  type="email"
                  placeholder="employee@underk.in"
                  {...email}
                  required
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={4}>
            <div className="custom-control custom-checkbox mb-4">
              <input
                className="custom-control-input"
                id="emailVerifiedCheck"
                type="checkbox"
                checked={emailVerified}
                onChange={(e) => setIsEmailVerified(e.target.checked)}
              />
              <label
                className="custom-control-label"
                htmlFor="emailVerifiedCheck"
              >
                Is Email Verified
              </label>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col sm={8}>
            <FormGroup row>
              <Label sm={3}>Mobile</Label>
              <Col xs={4} sm={3}>
                <Input type="select" {...mobileCountryCode} required>
                  <option value="+91">+91</option>
                </Input>
              </Col>
              <Col xs={8} sm={6}>
                <Input
                  type="text"
                  placeholder="7894561230"
                  {...mobileNumber}
                  required
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={4}>
            <div className="custom-control custom-checkbox mb-4">
              <input
                className="custom-control-input"
                id="mobileVerifiedCheck"
                type="checkbox"
                checked={mobileVerified}
                onChange={(e) => setIsMobileVerified(e.target.checked)}
              />
              <label
                className="custom-control-label"
                htmlFor="mobileVerifiedCheck"
              >
                Is Mobile Verified
              </label>
            </div>
          </Col>
        </Row>
        <FormGroup row>
          <Label sm={2}>DOB</Label>
          <Col sm={5}>
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
                closeOnSelect={true}
                value={dob}
                onChange={(v) => {
                  setDob(new Date(v.toString()));
                }}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row className="align-items-center">
          <Label sm={2}>Gender</Label>
          <Col sm={10}>
            <Row>
              <Col>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="genderRadio1"
                    name="gender"
                    type="radio"
                    value="M"
                    onChange={gender.onChange}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="genderRadio1"
                  >
                    Male
                  </label>
                </div>
              </Col>
              <Col>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="genderRadio2"
                    name="gender"
                    type="radio"
                    value="F"
                    onChange={gender.onChange}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="genderRadio2"
                  >
                    Female
                  </label>
                </div>
              </Col>
              <Col>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="genderRadio3"
                    name="gender"
                    type="radio"
                    value="N"
                    onChange={gender.onChange}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="genderRadio3"
                  >
                    None
                  </label>
                </div>
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Address</Label>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Dhanbad, Jharkhand"
              {...address}
              required
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

export default EmployeeCreate;
