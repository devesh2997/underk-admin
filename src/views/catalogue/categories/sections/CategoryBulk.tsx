import React, { useState } from "react";
import { useTabSelect } from "hooks/Index";
import FormWithGuidesAndErrors from "components/Widgets/FormWithGuidesAndErrors";
import { Row, Col, Table, Input } from "reactstrap";
import CSVReader from "react-csv-reader";
import { isEmpty, isNotEmpty, isEmptyString, isNotEmptyString } from "utils";
import { Category } from "models/catalogue/Category";

type Props = {
  categories: Category[] | undefined;
};

const CategoryBulk: React.FC<Props> = (props: Props) => {
  const { categories } = props;
  let [errors, setErrors] = useState<string[]>([]);

  let [valid, setValid] = useState(false);

  function handleFileSelection(csvData: any[], fileInfo: any) {
    console.log(fileInfo);
    let errors = [];
    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i];
      if (isEmpty(row)) continue;
      if (
        isEmptyString(row[0]) &&
        isEmptyString(row[1]) &&
        isEmptyString(row[2])
      )
        continue;
      const rowStr = "Row " + (i + 1) + " : ";
      if (isEmptyString(row[0])) {
        errors.push(rowStr + "Name should not be empty.");
      }
      if (isEmptyString(row[1])) {
        errors.push(rowStr + "SKU should not be empty.");
      }
      if (isEmptyString(row[2])) {
        errors.push(rowStr + "Slug should not be empty.");
      }

      for (let j = i + 1; j < csvData.length; j++) {
        const rowj = row[j];
        if (isEmpty(rowj)) continue;
        if (
          isNotEmptyString(row[0]) &&
          isNotEmptyString(rowj[0]) &&
          row[0] === rowj[0]
        ) {
          errors.push(rowStr + "Duplicate name exists at row " + j);
        }
        if (
          isNotEmptyString(row[0]) &&
          isNotEmptyString(rowj[0]) &&
          row[1] === rowj[1]
        ) {
          errors.push(rowStr + "Duplicate SKU exists at row " + j);
        }
        if (
          isNotEmptyString(row[0]) &&
          isNotEmptyString(rowj[0]) &&
          row[2] === rowj[2]
        ) {
          errors.push(rowStr + "Duplicate slug exists at row " + j);
        }
      }
      if (typeof categories !== "undefined") {
        if (isNotEmptyString(row[0])) {
          if (categories.some((c) => c.name === row[0])) {
            errors.push(rowStr + "Name is already in use.");
          }
        }
        if (isNotEmptyString(row[1])) {
          if (categories.some((c) => c.sku === row[1])) {
            errors.push(rowStr + "SKU is already in use.");
          }
        }
        if (isNotEmptyString(row[2])) {
          if (categories.some((c) => c.slug === row[2])) {
            errors.push(rowStr + "Slug is already in use.");
          }
        }
      }

      if (isNotEmptyString(row[3])) {
        if (!categories?.some((c) => c.slug === row[3])) {
          if (!csvData.some((s) => s[3] === row[3] && s[1] !== row[1])) {
            errors.push(
              rowStr + "Parent slug does not match with any existing category"
            );
          }
        }
      }
      setValid(errors.length === 0);
      setErrors(errors);
    }
  }
  return (
    <FormWithGuidesAndErrors
      errors={errors}
      valid={valid}
      heading={"Bulk Upload Categories : "}
      guides={[
        <span>Name, SKU and slug are all compulsory.</span>,
        <span>
          SKU and slug are unique. No two category should have the same SKU or
          slug.
        </span>,
        <span>
          If the category has a parent, please enter the slug of it's parent.
        </span>,
      ]}
      onSubmit={() => {}}
    >
      <Row>
        <Col>
          <h4 className="text-muted">
            Example: (Columns marked with '*' are compulsory)
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="align-items-center">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name *</th>
                <th scope="col">SKU *</th>
                <th scope="col">Slug *</th>
                <th scope="col">parentSlug (Optional)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Men's Wear</td>
                <td>MNW</td>
                <td>men-wear</td>
                <td></td>
              </tr>
              <tr>
                <td>Men's Top Wear</td>
                <td>MTW</td>
                <td>men-top-wear</td>
                <td>men-wear</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <hr className="my-3" />
      <Row className="mt-5">
        <Col sm="2">CSV File : </Col>
        <Col>
          <CSVReader
            cssClass="csv-reader-input"
            label=""
            inputId="ObiWan"
            inputStyle={{}}
            onFileLoaded={handleFileSelection}
          />
        </Col>
      </Row>
    </FormWithGuidesAndErrors>
  );
};

export default CategoryBulk;
