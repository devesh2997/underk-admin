import React from "react";
import ReactJson, { ThemeKeys } from "react-json-view";
import {
  Card,
  CardHeader,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useFormInput, useCheckboxInput } from "hooks/Index";

type Props = {
  src: object;
};

const JsonTreeView: React.FC<Props> = (props: Props) => {
  const { src } = props;
  const theme = useFormInput("monokai");
  const fontSize = useFormInput("14px");
  const displayObjectSize = useCheckboxInput(false);
  const collapsed = useCheckboxInput(false);
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Tree view</h3>
          </div>
          <div className="col text-right">
            <Input type="select" {...theme}>
              <option value="monokai">Monokai</option>
              <option value="apathy">apathy</option>
              <option value="apathy:inverted">apathy:inverted</option>
              <option value="ashes">ashes</option>
              <option value="bespin">bespin</option>
              <option value="brewer">brewer</option>
              <option value="bright:inverted">bright:inverted</option>
              <option value="bright">bright</option>
              <option value="chalk">chalk</option>
              <option value="codeschool">codeschool</option>
              <option value="colors">colors</option>
              <option value="eighties">eighties</option>
              <option value="embers">embers</option>
              <option value="eighties">eighties</option>
              <option value="flat">flat</option>
              <option value="google">google</option>
              <option value="grayscale">grayscale</option>
              <option value="grayscale:inverted">grayscale:inverted</option>
              <option value="greenscreen">greenscreen</option>
              <option value="harmonic">harmonic</option>
              <option value="hopscotch">hopscotch</option>
              <option value="isotope">isotope</option>
              <option value="marrakesh">marrakesh</option>
              <option value="mocha">mocha</option>
              <option value="paraiso">paraiso</option>
              <option value="pop">pop</option>
              <option value="ocean">ocean</option>
              <option value="railscasts">railscasts</option>
              <option value="rjv-default">rjv-default</option>
              <option value="shapeshifter">shapeshifter</option>
              <option value="shapeshifter:inverted">
                shapeshifter:inverted
              </option>
              <option value="solarized">solarized</option>
              <option value="summerfruit">summerfruit</option>
              <option value="summerfruit:inverted">summerfruit:inverted</option>
              <option value="threezerotwofour">threezerotwofour</option>
              <option value="tomorrow">tomorrow</option>
              <option value="tube">tube</option>
              <option value="twilight">twilight</option>
            </Input>
          </div>
          <div className="col text-right">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Font:</InputGroupText>
              </InputGroupAddon>
              <Input type="select" {...fontSize}>
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
                <option value="20px">20</option>
                <option value="24px">24</option>
              </Input>
            </InputGroup>
          </div>
          <div className="col text-right">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Collapsed :</InputGroupText>
              </InputGroupAddon>
              <label className="custom-toggle">
                <input type="checkbox" {...collapsed} />
                <span className="custom-toggle-slider rounded-circle" />
              </label>
            </InputGroup>
          </div>
          <div className="col text-right">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Object Size :</InputGroupText>
              </InputGroupAddon>
              <label className="custom-toggle">
                <input type="checkbox" {...displayObjectSize} />
                <span className="custom-toggle-slider rounded-circle" />
              </label>
            </InputGroup>
          </div>
        </Row>
      </CardHeader>
      <ReactJson
        src={src}
        theme={theme.value as ThemeKeys}
        style={{ fontSize: fontSize.value, fontFamily: "Open Sans" }}
        displayObjectSize={displayObjectSize.checked}
        collapsed={collapsed.checked}
      />
    </Card>
  );
};

export default JsonTreeView;
