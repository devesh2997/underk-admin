import React, { useState } from "react";
import useTypeAndAttributesRepository from "data/catalogue/TypeAndAttributesRepository";
import useProductsBulkUploadRepository, {
  ProductCreateInfo,
} from "data/catalogue/products/BulkUploadRepository";
import { FormWithGuidesAndErrors, Loading } from "components/Widgets";
import { Subtype } from "models/catalogue/Subtype";
import { isEmpty } from "lodash";
import { useFormInput } from "hooks/Index";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
import { CSVLink } from "react-csv";
import CSVReader from "react-csv-reader";
import {
  convertCSVDataArrayToProductNumberBasedMap,
  parseProductNumberBasedMap,
} from "./BulkUploadUtils";
import useCategoriesRepository from "data/catalogue/CategoriesRepository";
import useCollectionsRepository from "data/catalogue/CollectionsRepository";
import useWarehousesRepository from "data/inventory/WarehouseRepository";
import { validateProductCreateInfo } from "underk-utils";

//TODO manage errors from types, categories, collections and warehouses repositories
const BulkUploadProducts: React.FC = () => {
  const productsBulkUploadRepo = useProductsBulkUploadRepository();
  const {
    loading,
    error,
    result,
    bulkUpload,
    message,
  } = productsBulkUploadRepo;

  const typesRepo = useTypeAndAttributesRepository();
  const { types } = typesRepo;
  const typesError = typesRepo.error;
  const loadingTypes = typesRepo.loading;

  const categoriesRepo = useCategoriesRepository();
  const { categoriesFlatArray } = categoriesRepo;
  const categoriesError = categoriesRepo.error;
  const loadingCategories = categoriesRepo.loading;

  const collectionsRepo = useCollectionsRepository();
  const { collections } = collectionsRepo;
  const collectionsError = collectionsRepo.error;
  const loadingCollections = collectionsRepo.loading;

  const warehousesRepo = useWarehousesRepository();
  const { warehouses } = warehousesRepo;
  const warehousesError = warehousesRepo.error;
  const loadingWareshouses = warehousesRepo.loading;

  const [errors, setErrors] = useState<string[]>([]);

  const [productsCreateInfo, setProductsCreateInfo] = useState<
    ProductCreateInfo[]
  >([]);

  const typeSelect = useFormInput("-");
  const subtypeSelect = useFormInput("-");

  const selectedType = types.find(
    (type) => type.id.toString() === typeSelect.value
  );
  let selectedSubtype: Subtype | undefined;
  if (!isEmpty(selectedType)) {
    selectedSubtype = selectedType?.subtypes.find(
      (subtype) => subtype.id.toString() === subtypeSelect.value
    );
  }

  function onAssetsFolderChanged(event: React.FormEvent<HTMLInputElement>) {
    let assetFiles = event.currentTarget.files;
    if (assetFiles !== null) {
      for (let i = 0; i < assetFiles.length; i++) {
        console.log(assetFiles[i]);
      }
    }
  }

  function handleFileSelection(csvData: any[], _: any) {
    if (
      typeof selectedType !== "undefined" &&
      typeof selectedSubtype !== "undefined"
    ) {
      const errors = [];
      const validProductsCreateInfo: ProductCreateInfo[] = [];

      try {
        const csvDataMap = convertCSVDataArrayToProductNumberBasedMap(csvData);
        const productsCreateInfo = parseProductNumberBasedMap(
          csvDataMap,
          selectedType,
          selectedSubtype
        );
        for (let i = 0; i < productsCreateInfo.length; i++) {
          const productValidationResult = validateProductCreateInfo(
            productsCreateInfo[i].productInfo,
            types,
            categoriesFlatArray!,
            collections,
            warehouses
          );
          if (productValidationResult.isValid) {
            validProductsCreateInfo.push(productsCreateInfo[i].productInfo);
          } else {
            errors.push(
              `Product Number : ${productsCreateInfo[i].productNumber} ; Error : ` +
                productValidationResult.error
            );
          }
        }
      } catch (e) {
        console.log(e);
        errors.push(e);
      }
      setProductsCreateInfo(validProductsCreateInfo);
      setErrors(errors);
    }
  }

  const loadingData =
    loadingTypes ||
    loadingCategories ||
    loadingCollections ||
    loadingWareshouses;
  return (
    <Card>
      <Container className="mt-3" fluid>
        {loadingData && <Loading />}
        {!loadingData && (
          <>
            <Row>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Choose Assets Folder</InputGroupText>
                </InputGroupAddon>
                <Label></Label>
                <Input
                  label="Choose Assets Folder"
                  directory=""
                  webkitdirectory=""
                  type="file"
                  onChange={onAssetsFolderChanged}
                />
              </InputGroup>
            </Row>
            <Row>
              <Col sm="2">
                <h3>Select Type : </h3>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    id="selectEntity"
                    name="selectedEntity"
                    type="select"
                    {...typeSelect}
                  >
                    <option value="-">-</option>
                    {types.map((type) => (
                      <option key={type.name} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {typeSelect.value !== "-" && (
              <Row>
                <Col sm="2">
                  <h3>Select Subtype : </h3>
                </Col>
                <Col>
                  <FormGroup>
                    <Input
                      id="selectEntity"
                      name="selectedEntity"
                      type="select"
                      {...subtypeSelect}
                    >
                      <option value="-">-</option>
                      {types
                        .find((type) => type.id.toString() === typeSelect.value)
                        ?.subtypes?.map((subtype) => (
                          <option key={subtype.name} value={subtype.id}>
                            {subtype.name}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            )}

            {result && (
              <>
                {" "}
                <Row className="mt-5">
                  <Col>Total Products Created : {result.products.length}</Col>
                </Row>
                {result.errors && result.errors.length > 0 && (
                  <Row className="mt-5">
                    <Col>
                      <ul className="list-unstyled">
                        <li>
                          <h4 style={{ color: "info" }}>Errors :</h4>
                          <ul>
                            {result.errors.map((err, i) => (
                              <li key={i}>{JSON.stringify(err)}</li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                )}
              </>
            )}

            {!isEmpty(selectedSubtype) && (
              <>
                <FormWithGuidesAndErrors
                  heading="Upload CSV data"
                  errors={errors}
                  valid={errors.length === 0 && productsCreateInfo.length > 0}
                  onSubmit={() => {
                    bulkUpload(productsCreateInfo);
                  }}
                  guides={[
                    <span>
                      Start entering the data from the 3rd row. Leave the first
                      two rows <b>unchanged</b>.
                    </span>,
                    <span>
                      In case any product has multiple options, enter them in
                      separate rows and fill all the common details only in the
                      first row of that product.{" "}
                    </span>,
                    <span>
                      All the multi values columns (for eg. collections,
                      attributes where multiple values are allowed) should have
                      the separated by ;;{" "}
                    </span>,
                    <span>
                      <img
                        src={require("assets/img/miscellaneous/bulk_upload_products_example.jpeg")}
                      />
                    </span>,
                  ]}
                >
                  <Row className="mt-5 align-items-center">
                    <Col sm="2">CSV File : </Col>
                    <Col>
                      <CSVReader
                        cssClass="csv-reader-input"
                        label=""
                        inputStyle={{}}
                        onFileLoaded={handleFileSelection}
                      />
                    </Col>
                    <Col>
                      <CSVLink
                        data={[]}
                        headers={prepareSampleCSVDataHeaders(selectedSubtype!)}
                      >
                        Download CSV Template
                      </CSVLink>
                    </Col>
                  </Row>
                </FormWithGuidesAndErrors>
              </>
            )}
          </>
        )}
      </Container>
    </Card>
  );
};

const prepareSampleCSVDataHeaders = (subtype: Subtype): string[] => {
  let headers = [
    "Product Number",
    "Product Title",
    "Product Slug",
    "Category slug",
    "Collection Slugs",
    ...subtype.skuAttributes.map((subtypeAttribute) => subtypeAttribute.name),
  ];
  if (typeof subtype.attributes !== "undefined") {
    headers.push(...subtype.attributes.map((attr) => attr.name));
  }
  if (
    typeof subtype !== "undefined" &&
    typeof subtype.optionAttribute !== "undefined"
  ) {
    headers.push(subtype.optionAttribute.name);
  }

  headers.push(
    "listPrice",
    "salePrice",
    "taxPercent",
    "isInclusiveTax",
    "length",
    "breadth",
    "height",
    "weight",
    "warehouseCode",
    "stock"
  );

  return headers;
};

export default BulkUploadProducts;
