import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputProps,
} from "reactstrap";

const PasswordInput: React.FC<InputProps> = ({ children, ...props }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  return (
    <InputGroup>
      <Input type={isPasswordVisible ? "text" : "password"} {...props} />
      <InputGroupAddon addonType="append">
        <InputGroupText
          onClick={() => setPasswordVisibility(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <i className="far fa-eye-slash"></i>
          ) : (
            <i className="far fa-eye"></i>
          )}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default PasswordInput;
