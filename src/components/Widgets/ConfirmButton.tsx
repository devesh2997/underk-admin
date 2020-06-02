import React, { useRef, useEffect, useState } from "react";
import { Button, ButtonProps } from "reactstrap";
import LoadingButton from "./LoadingButton";

type ConfirmButtonProps = {
  confirmText: string;
  onConfirm: Function;
  showLoading?: boolean;
};

const ConfirmButton: React.FC<ConfirmButtonProps & ButtonProps> = ({
  confirmText,
  onConfirm,
  showLoading,
  children,
  ...props
}) => {
  const isMounted = useRef(true);

  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleClick() {
    isMounted.current && toggleLoading(true);

    const isConfirmed = window.confirm(confirmText);
    if (isConfirmed) {
      await onConfirm();
    }

    isMounted.current && toggleLoading(false);
  }

  return showLoading ? (
    <LoadingButton loading={loading} onClick={handleClick} {...props}>
      {children}
    </LoadingButton>
  ) : (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

ConfirmButton.defaultProps = {
  showLoading: false,
};

export default ConfirmButton;
