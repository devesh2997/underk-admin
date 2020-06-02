import React from "react";
import { Label, LabelProps } from "reactstrap";

type CustomInputLabelProps = {
  mandatory?: boolean;
};

const CustomInputLabel: React.FC<CustomInputLabelProps & LabelProps> = ({
  mandatory,
  children,
  ...props
}) => {
  return (
    <Label {...props}>
      {children}
      {mandatory ? (
        <sup className="ml-1" style={{ color: "red" }}>
          *
        </sup>
      ) : null}
    </Label>
  );
};

CustomInputLabel.defaultProps = {
  mandatory: false,
};

export default CustomInputLabel;
