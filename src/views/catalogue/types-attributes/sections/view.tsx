import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import Type from "models/catalogue/Type";
import Refresh from "components/Widgets/Refresh";
import TableWithColorToggler from "components/Widgets/TableWithColorToggler";
import { isEmpty } from "utils";

type Props = {
  types: Type[];
  getAllTypes: () => Promise<void>;
};

const TypesAttributesView = (props: Props) => {
  const { types } = props;
  let rows = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    if (typeof type.subtypes !== "undefined" && type.subtypes?.length > 0) {
      for (let j = 0; j < type.subtypes.length; j++) {
        const subtype = type.subtypes[j];
        if (
          typeof subtype.attributes !== "undefined" &&
          subtype.attributes.length > 0
        ) {
          for (let k = 0; k < subtype.attributes.length; k++) {
            const attribute = subtype.attributes[k];
            rows.push(
              <tr key={type.name + subtype.name + attribute.name}>
                <td>{type.name}</td>
                <td>{subtype.name}</td>
                <td>{attribute.name}</td>
              </tr>
            );
          }
        } else {
          rows.push(
            <tr key={type.name + subtype.name}>
              <td>{type.name}</td>
              <td>{subtype.name}</td>
            </tr>
          );
        }
      }
    } else {
      rows.push(
        <tr key={type.name}>
          <td>{type.name}</td>
        </tr>
      );
    }
  }
  return (
    <>
      <TableWithColorToggler
        columns={["Type", "Subtype", "Attribute", "AttributeValue"]}
      >
        <tbody>{rows}</tbody>
      </TableWithColorToggler>
    </>
  );
};

export default TypesAttributesView;
