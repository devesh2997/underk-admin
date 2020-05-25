import React, { useState } from "react";
import FormWithGuidesAndErrors from "components/Widgets/FormWithGuidesAndErrors";
import { Row, Col, Table } from "reactstrap";
import CSVReader from "react-csv-reader";
import { isEmpty, isEmptyString, isNotEmptyString } from "utils";
import { Collection } from "models/catalogue/Collection";
import { BulkCreateResult } from "models/shared/BulkCreateResult";
import { CollectionCreateInfo } from "data/catalogue/CollectionsRepository";

type Props = {
  collections: Collection[] | undefined;
  bulkCreate: (
    collectionsInfo: {
      name: string;
      slug: string;
    }[]
  ) => Promise<void>;
  bulkCreateResult: BulkCreateResult<Collection> | undefined;
};

const CollectionBulk: React.FC<Props> = (props: Props) => {
  const { collections, bulkCreate, bulkCreateResult } = props;
  let [errors, setErrors] = useState<string[]>([]);

  let [valid, setValid] = useState(false);

  let [collectionsInfo, setCollectionsInfo] = useState<CollectionCreateInfo[]>([]);

  function handleFileSelection(csvData: any[], _: any) {
    let collectionsInfo: CollectionCreateInfo[] = [];
    let errors = [];
    for (let i = 0; i < csvData.length; i++) {
      let isValid = true;
      const row = csvData[i];
      if (isEmpty(row)) continue;
      if (
        isEmptyString(row[0]) &&
        isEmptyString(row[1])
      )
        continue;
      const rowStr = "Row " + (i + 1) + " : ";
      if (isEmptyString(row[0])) {
        isValid = false;
        errors.push(rowStr + "Name should not be empty.");
      }
      if (isEmptyString(row[1])) {
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
          errors.push(rowStr + "Duplicate slug exists at row " + j);
        }
      }
      if (typeof collections !== "undefined") {
        if (isNotEmptyString(row[0])) {
          if (collections.some((c) => c.name === row[0])) {
            isValid = false;
            errors.push(rowStr + "Name is already in use.");
          }
        }
        if (isNotEmptyString(row[1])) {
          if (collections.some((c) => c.slug === row[2])) {
            isValid = false;
            errors.push(rowStr + "Slug is already in use.");
          }
        }
      }
      if (isValid) {
        collectionsInfo.push({
          name: row[0],
          slug: row[1],
        });
      }
    }
    setValid(errors.length === 0);
    setErrors(errors);
    setCollectionsInfo(collectionsInfo);
  }
  return (
    <FormWithGuidesAndErrors
      errors={errors}
      valid={valid}
      heading={"Bulk Upload Collections : "}
      guides={[
        <span>Name and slug are both compulsory.</span>,
        <span>
          Name and slug are unique. No two category should have the same Name or slug.
        </span>,
      ]}
      onSubmit={() => {
        bulkCreate(collectionsInfo);
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Graphic T-shirts</td>
                <td>graphic-tshirts</td>
              </tr>
              <tr>
                <td>Clearance zone</td>
                <td>clearance-zone</td>
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
                      <h4 style={{ color: "info" }}>Collections created :</h4>
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
            inputId="ObiWan"
            inputStyle={{}}
            onFileLoaded={handleFileSelection}
          />
        </Col>
      </Row>
    </FormWithGuidesAndErrors>
  );
};

export default CollectionBulk;
