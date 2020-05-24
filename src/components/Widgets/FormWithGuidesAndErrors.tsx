import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import { User } from "models/User";
import { create } from "domain";

type Props = {
  heading?: string;
  guides?: JSX.Element[];
  errors?: string[];
  onSubmit?: Function;
  valid?: boolean;
  children?: React.ReactNode;
};

const FormWithGuidesAndErrors: React.FC<Props> = (props: Props) => {
  const { heading, guides, onSubmit, errors, valid } = props;
  return (
    <Card className="shadow">
      {heading && (
        <CardHeader>
          <h3>{heading} </h3>
        </CardHeader>
      )}
      <CardBody>
        {guides && (
          <>
            <Row>
              <Col>
                <ul className="list-unstyled">
                  <li>
                    <h4 className="text-muted">Guide:</h4>
                    <ul>
                      {guides.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </Col>
            </Row>
            <hr className="my-3" />
          </>
        )}
        {props.children}
        {errors && errors.length > 0 && (
          <Row className="mt-5">
            <Col>
              <ul className="list-unstyled">
                <li>
                  <h4 style={{ color: "red" }}>Errors:</h4>
                  <ul>
                    {errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </Col>
          </Row>
        )}
        {onSubmit && (
          <Row className="justify-content-md-center mt-3">
            <Col lg="2">
              <Button
                disabled={!valid}
                color="primary"
                type="button"
                onClick={() => onSubmit()}
              >
                Submit
              </Button>
            </Col>
          </Row>
        )}
      </CardBody>
    </Card>
  );
};

FormWithGuidesAndErrors.defaultProps = {
  valid: true,
};

export default FormWithGuidesAndErrors;
