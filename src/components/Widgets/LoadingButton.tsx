import React from "react";
import { Button, ButtonProps } from "reactstrap";

type LoadingButtonProps = {
  loading: boolean;
};

const LoadingButton: React.FC<LoadingButtonProps&ButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <i className="fas fa-circle-notch fa-spin" /> : children}
    </Button>
  );
};

export default LoadingButton;
