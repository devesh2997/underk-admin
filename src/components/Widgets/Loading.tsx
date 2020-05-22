import React from "react";
import { getPrimaryColor } from "utils";

interface Props {
  size?: number;
}
const Loading: React.FC<Props> = (props: Props) => {
  const size = String(props.size) + "px";
  return (
    <i
      className="fas fa-circle-notch fa-spin"
      style={{ fontSize: size, color: getPrimaryColor() }}
    />
  );
};

Loading.defaultProps = {
  size: 48,
};

export default Loading;
