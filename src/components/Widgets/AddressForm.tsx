import React from "react";
import { Col, Row, Input } from "reactstrap";
import { Address } from "models/shared/Address";
import { SetAddressHook } from "hooks/Index";

type Props = {
    address: Address
    setAddress: SetAddressHook
}

const AddressForm: React.FC<Props> = (props: Props) => {
    const {address, setAddress} = props
  return (
    <>
      <Row>
        <Col sm={1}>Building : </Col>
        <Col>
          <Input value={address.building} onChange={setAddress.handleBuildingChange}/>
        </Col>
        <Col sm={1}>Locality : </Col>
        <Col>
          <Input value={address.locality} onChange={setAddress.handleLocalityChange}/>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={1}>Landmark : </Col>
        <Col>
          <Input value={address.landmark} onChange={setAddress.handleLandmarkChange} />
        </Col>
        <Col sm={1}>City : </Col>
        <Col>
          <Input value={address.city} onChange={setAddress.handleCityChange} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={1}>State : </Col>
        <Col>
          <Input value={address.state} onChange={setAddress.handleStateChange} />
        </Col>
        <Col sm={1}>Pincode : </Col>
        <Col>
          <Input value={address.pincode} onChange={setAddress.handlePincodeChange} />
        </Col>
      </Row>
    </>
  );
};

export default AddressForm;
