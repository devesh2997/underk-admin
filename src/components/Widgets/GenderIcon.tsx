import React from "react";

type Props = {
  gender?: string;
  size?: number;
};

const GenderIcon: React.FC<Props> = (props: Props) => {
  const gender = props.gender;
  let size = "";
  if (props.size !== undefined) {
    size = props.size.toString() + "px";
  }
  switch (gender) {
    case "M":
      return (
        <i
          className="fas fa-mars"
          style={{ color: "blue", fontSize: size }}
        ></i>
      );
    case "F":
      return (
        <i
          className="fas fa-venus"
          style={{ color: "pink", fontSize: size }}
        ></i>
      );
    case "U":
      return <span>U</span>;
    default:
      return <span>N</span>;
  }
};

GenderIcon.defaultProps = {
  size: 18,
};

export default GenderIcon;
