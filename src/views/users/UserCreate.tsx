import React, { useState } from "react";
import { User } from "models/User";
import {
  Row,
  Col,
  Button,
  CardBody,
  Card,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardHeader,
} from "reactstrap";
import { useFormInput } from "hooks/Index";
import ReactDatetime from "react-datetime";
import { isNumber } from "util";

type Props = {
  create: (userInfo: User) => Promise<void>;
};

const UserCreate: React.FC<Props> = (props: Props) => {
  const { create } = props;
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const mobileNumber = useFormInput("");
  const mobileCountryCode = useFormInput("+91");
  const [mobileVerified, setIsMobileVerified] = useState(false);
  const [emailVerified, setIsEmailVerified] = useState(false);
  const email = useFormInput("");
  const gender = useFormInput("N");
  const [dob, setDob] = useState<Date>();

  let errors: string[] = [];

  let valid = true;
  if (mobileNumber.value.length === 0 && email.value.length === 0) {
    valid = false;
    errors.push("Please enter mobile number or email.");
  }
  if (mobileNumber.value.length > 0) {
    if (isNaN(Number(mobileNumber.value))) {
      valid = false;
      errors.push("Mobile number should only contain digits");
      if (mobileVerified) {
        errors.push("Mobile is invalid, cannot be verified.");
      }
    }
    if (mobileNumber.value.length !== 10) {
      valid = false;
      errors.push("Invalid mobile number length");
      if (mobileVerified) {
        errors.push("Mobile is invalid, cannot be verified.");
      }
    }
  } else if (mobileVerified) {
    errors.push("Mobile is empty, cannot be verified");
    valid = false;
  }
  if (email.value.length === 0 && emailVerified) {
    valid = false;
    errors.push("Email is empty, cannot be verified");
  }
  if (!emailVerified && !mobileVerified) {
    valid = false;
    errors.push("Atleast one of mobile or email must be verified");
  }

  return (
    <Card className="shadow">
      <CardHeader>
        <h3 className="mb-3">User Form :</h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <ul className="list-unstyled">
              <li>
                Guide:
                <ul>
                  <li>
                    Atleast one of mobile number or email must be provided
                  </li>
                  <li>Atleat one of mobile number or must be verified</li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="1">Name :</Col>
          <Col>
            <Input type="text" placeholder="First Name" {...firstName} />
          </Col>
          <Col>
            <Input type="text" placeholder="Last Name" {...lastName} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="1">Mobile :</Col>
          <Col sm="1">
            <Input type="select" {...mobileCountryCode}>
              <option value="+91">+91</option>
            </Input>
          </Col>
          <Col>
            <Input type="text" placeholder="1234567890" {...mobileNumber} />
          </Col>
          <Col>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                id="mobileVerifiedCheck"
                type="checkbox"
                onChange={() => setIsMobileVerified(!mobileVerified)}
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
        <Row className="mt-3">
          <Col sm="1">Email :</Col>
          <Col>
            <Input type="text" placeholder="deveshgod@underk.in" {...email} />
          </Col>

          <Col>
            <div className="custom-control custom-checkbox mb-3">
              <input
                className="custom-control-input"
                id="emailVerifiedCheck"
                type="checkbox"
                onChange={() => setIsEmailVerified(!emailVerified)}
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
        <Row className="mt-3">
          <Col sm="1">Gender :</Col>
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
          <Col sm="1">DOB: </Col>
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

        <Row className="justify-content-md-center mt-3">
          <Col lg="2">
            <Button
              disabled={!valid}
              color="primary"
              type="button"
              onClick={() => {
                let userInfo: User = {
                  emailVerified,
                  mobileVerified,
                  firstName: firstName.value,
                  lastName: lastName.value,
                  email: email.value,
                  dob: dob,
                  gender: gender.value,
                };
                if (mobileNumber.value.length > 0) {
                  userInfo = {
                    ...userInfo,
                    mobileCountryCode: mobileCountryCode.value,
                    mobileNumber: Number(mobileNumber.value),
                  };
                }
                create(userInfo);
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <ul>
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default UserCreate;
