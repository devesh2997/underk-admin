import React, { useState } from "react";
import FormWithGuidesAndErrors from "components/Widgets/FormWithGuidesAndErrors";
import { Row, Col, Table } from "reactstrap";
import CSVReader from "react-csv-reader";
import { isEmpty, isEmptyString, isNotEmptyString } from "utils";
import { Category } from "models/catalogue/Category";
import { BulkCreateResult } from "models/shared/BulkCreateResult";
import { CategoryCreateInfo } from "data/catalogue/CategoriesRepository";

type Props = {
  categories: Category[] | undefined;
  bulkCreate: (
    categoriesInfo: {
      name: string;
      slug: string;
      sku: string;
      parentSlug: string;
    }[]
  ) => Promise<void>;
  bulkCreateResult: BulkCreateResult<Category> | undefined;
};

const CategoryBulk: React.FC<Props> = (props: Props) => {
  const { categories, bulkCreate, bulkCreateResult } = props;
  let [errors, setErrors] = useState<string[]>([]);

  let [valid, setValid] = useState(false);

  let [categoriesInfo, setCategoriesInfo] = useState<CategoryCreateInfo[]>([]);

  function handleFileSelection(csvData: any[], _: any) {
    let categoriesInfo: CategoryCreateInfo[] = [];
    let errors = [];
    for (let i = 0; i < csvData.length; i++) {
      let isValid = true;
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
        isValid = false;
        errors.push(rowStr + "Name should not be empty.");
      }
      if (isEmptyString(row[1])) {
        isValid = false;
        errors.push(rowStr + "SKU should not be empty.");
      }
      if (isEmptyString(row[2])) {
        isValid = false;
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
          isValid = false;
          errors.push(rowStr + "Duplicate name exists at row " + j);
        }
        if (
          isNotEmptyString(row[1]) &&
          isNotEmptyString(rowj[1]) &&
          row[1] === rowj[1]
        ) {
          isValid = false;
          errors.push(rowStr + "Duplicate SKU exists at row " + j);
        }
        if (
          isNotEmptyString(row[2]) &&
          isNotEmptyString(rowj[2]) &&
          row[2] === rowj[2]
        ) {
          isValid = false;
          errors.push(rowStr + "Duplicate slug exists at row " + j);
        }
      }
      if (typeof categories !== "undefined") {
        if (isNotEmptyString(row[0])) {
          if (categories.some((c) => c.name === row[0])) {
            isValid = false;
            errors.push(rowStr + "Name is already in use.");
          }
        }
        if (isNotEmptyString(row[1])) {
          if (categories.some((c) => c.sku === row[1])) {
            isValid = false;
            errors.push(rowStr + "SKU is already in use.");
          }
        }
        if (isNotEmptyString(row[2])) {
          if (categories.some((c) => c.slug === row[2])) {
            isValid = false;
            errors.push(rowStr + "Slug is already in use.");
          }
        }
      }

      if (isNotEmptyString(row[3])) {
        if (!categories?.some((c) => c.slug === row[3])) {
          if (!csvData.some((s) => s[1] === row[3] && s[1] !== row[1])) {
            isValid = false;
            errors.push(
              rowStr + "Parent slug does not match with any existing category"
            );
          }
        }
      }
      if (isValid) {
        categoriesInfo.push({
          name: row[0],
          slug: row[1],
          sku: row[2],
          parentSlug: isNotEmptyString(row[3]) ? row[3] : undefined,
        });
      }
    }
    setValid(errors.length === 0);
    setErrors(errors);
    setCategoriesInfo(categoriesInfo);
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
          If the category has a parent, please enter the slug of it's parent in column 4.
        </span>,
      ]}
      onSubmit={() => {
        bulkCreate(categoriesInfo);
      }}
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
      {bulkCreateResult && (
        <>
          <Row className="mt-5">
            <Col>Bulk create result : </Col>
          </Row>
          {bulkCreateResult.errors && bulkCreateResult.errors.length > 0 && (
            <Row className="mt-5">
              <Col>
                <ul className="list-unstyled">
                  <li>
                    <h4 style={{ color: "red" }}>Errors:</h4>
                    <ul>
                      {bulkCreateResult.errors.map((err) => (
                        <li
                          key={err.index}
                        >{`Row : ${err.index} , error : ${err.error}`}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </Col>
            </Row>
          )}
          {bulkCreateResult.entitiesCreated &&
            bulkCreateResult.entitiesCreated.length > 0 && (
              <Row className="mt-5">
                <Col>
                  <ul className="list-unstyled">
                    <li>
                      <h4 style={{ color: "info" }}>Categories created :</h4>
                      <ul>
                        {bulkCreateResult.entitiesCreated.map((ent, i) => (
                          <li key={i}>{JSON.stringify(ent)}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </Col>
              </Row>
            )}
        </>
      )}

      <Row className="mt-5">
        <Col sm="2">CSV File : </Col>
        <Col>
          <CSVReader
            cssClass="csv-reader-input"
            label=""
            inputStyle={{}}
            onFileLoaded={handleFileSelection}
          />
        </Col>
      </Row>
    </FormWithGuidesAndErrors>
  );
};

export default CategoryBulk;
