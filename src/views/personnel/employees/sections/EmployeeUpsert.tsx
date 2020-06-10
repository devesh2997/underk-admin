import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  FormGroup,
  InputGroup,
  Input,
  Col,
  Row,
  Container,
  InputGroupAddon,
  InputGroupText,
  UncontrolledAlert,
} from "reactstrap";
import { useFormInput } from "hooks/Index";
import ReactDatetime from "react-datetime";
import { EmployeeCreateFunc, EmployeeUpdateFunc } from "data/EmployeeRepository";
import { CustomInputLabel, LoadingButton } from "components/Widgets";
import { useHistory, useLocation } from "react-router-dom";
import Employee from "models/Employee";

type EmployeeUpsertProps = {
  createEmployee: EmployeeCreateFunc;
  updateEmployee: EmployeeUpdateFunc
};

const EmployeeUpsert: React.FC<EmployeeUpsertProps> = ({ createEmployee, updateEmployee }) => {
  const isMounted = useRef(true);
  const history = useHistory();
  const location = useLocation<{ employee?: Employee } | null | undefined>();
  const employee: Employee | null | undefined = location.state?.employee;

  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState("");

  const firstName = useFormInput(employee ? employee.firstName : "");
  const lastName = useFormInput(employee ? employee.lastName : "");
  const email = useFormInput(employee ? employee.email : "");
  const [emailVerified, setIsEmailVerified] = useState(
    employee ? employee.emailVerified : false
  );
  const mobileCountryCode = useFormInput(
    employee ? employee.mobileCountryCode : "+91"
  );
  const mobileNumber = useFormInput(
    employee ? employee.mobileNumber.toString() : ""
  );
  const [mobileVerified, setIsMobileVerified] = useState(
    employee ? employee.mobileVerified : false
  );
  const [dob, setDob] = useState<Date | undefined>(
    employee ? new Date(Number(employee.dob)) : undefined
  );
  const gender = useFormInput(employee ? employee.gender : "");
  const address = useFormInput(employee ? employee.address : "");

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    isMounted.current && toggleLoading(true);
    isMounted.current && setError("");

    if(employee) {
      const result = await updateEmployee({
        euid: employee.euid,
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
      if (result.isErr()) {
        isMounted.current && setError(result.error);
      } else {
        console.log("EmployeeUpdate", result.value);
        history.push("/admin/personnel/employees");
      }
    } else {
      const result = await createEmployee({
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
      if (result.isErr()) {
        isMounted.current && setError(result.error);
      } else {
        console.log("EmployeeInsert", result.value);
        history.push("/admin/personnel/employees");
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
              <CustomInputLabel sm={3} mandatory>
                Email
              </CustomInputLabel>
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
              <CustomInputLabel sm={3} mandatory>
                Mobile
              </CustomInputLabel>
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
          <CustomInputLabel sm={2} mandatory>
            DOB
          </CustomInputLabel>
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
          <CustomInputLabel sm={2} mandatory>
            Gender
          </CustomInputLabel>
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
                    checked={gender.value === "M"}
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
                    checked={gender.value === "F"}
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
                    checked={gender.value === "N"}
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
          <CustomInputLabel sm={2} mandatory>
            Address
          </CustomInputLabel>
          <Col sm={10}>
            <Input
              type="text"
              placeholder="Dhanbad, Jharkhand"
              {...address}
              required
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

export default EmployeeUpsert;
