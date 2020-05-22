import React from "react";
import { getPrimaryColor } from "utils";

interface Props {
  size?: number;
}
const Refresh: React.FC<Props> = (props: Props) => {
  const size = String(props.size) + "px";
  return (
    <i
      className="fas fa-redo-alt"
      style={{ fontSize: size, color: getPrimaryColor() }}
    />
  );
};

Refresh.defaultProps = {
  size: 32,
};

export default Refresh;
