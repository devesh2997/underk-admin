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

const FormWithGuidesAndErros: React.FC<Props> = (props: Props) => {
  const { heading, guides, onSubmit, errors, valid } = props;
  return (
    <Card className="shadow">
      {heading && (
        <CardHeader>
          <h2>{heading} </h2>
        </CardHeader>
      )}
      <CardBody>
        {guides && (
          <>
            <Row>
              <Col>
                <ul className="list-unstyled">
                  <li>
                    <strong>Guide:</strong>
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
              <Row>
                <Col>
                  <ul className="list-unstyled">
                    <li>
                      Errors:
                      <ul>
                        {errors.map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </Col>
              </Row>
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

FormWithGuidesAndErros.defaultProps = {
  valid: true,
};

export default FormWithGuidesAndErros;
