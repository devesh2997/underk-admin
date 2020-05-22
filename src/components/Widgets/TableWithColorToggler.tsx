import React, { useState } from "react";
import { Table } from "reactstrap";

type Props = {
  color?: string;
  columns?: string[];
  children?: React.ReactNode;
};

const TableWithColorToggler: React.FC<Props> = (props: Props) => {
  const [isDark, setIsDark] = useState(props.color === "dark");
  let tableClassName = "align-items-center";
  let theadClassName = "thead-";
  if (isDark) {
    tableClassName += " table-dark";
    theadClassName += "dark";
  } else {
    theadClassName += "light";
  }
  return (
    <Table className={tableClassName} responsive>
      <thead className={theadClassName}>
        <tr>
          {props.columns?.map((cName) => (
            <th key={cName} scope="col">
              {cName}
            </th>
          ))}
          <th>
            <span>
              <i
                onClick={() => setIsDark(!isDark)}
                className="fas fa-lightbulb"
                style={{
                  cursor: "pointer",
                  color: isDark ? "#ffd600" : "black",
                  fontSize: "16px",
                }}
              />
            </span>
          </th>
        </tr>
      </thead>
      {props.children}
    </Table>
  );
};

TableWithColorToggler.defaultProps = {
  color: "light",
};

export default TableWithColorToggler;
