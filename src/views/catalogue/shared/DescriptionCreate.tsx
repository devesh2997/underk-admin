import React, { useState } from "react";
import { Description } from "../../../models/catalogue/Description";
import { Row, Col, Button, Input } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  descriptions: Description[];
  setDescriptions: React.Dispatch<React.SetStateAction<Description[]>>;
};

const DescriptionCreate: React.FC<Props> = (props: Props) => {
  const { descriptions, setDescriptions } = props;

  const addDescription = () => {
    setDescriptions((descriptions) => {
      return [
        ...descriptions,
        {
          order: descriptions.length,
          style: "D1",
          body: "",
          assets: [{ order: 0, fullScreenImageUrl: "" }],
        },
      ];
    });
  };

  const removeDescription = (index: number) => {
    setDescriptions((descriptions) => {
      return descriptions.filter((_, i) => i !== index);
    });
  };

  const descriptionChangeHandler = (
    e: React.FormEvent<HTMLInputElement>,
    descriptionIndex: number
  ) => {
    if (descriptionIndex < 0 || descriptionIndex >= descriptions.length) return;

    switch (e.currentTarget.name) {
      case "style":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex ? d : { ...d, style: e.currentTarget.value }
          )
        );
        break;
      case "heading":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, heading: e.currentTarget.value }
          )
        );
        break;
      case "linkButtonText":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, linkButtonText: e.currentTarget.value }
          )
        );
        break;
      case "linkButtonHyperlink":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, linkButtonHyperlink: e.currentTarget.value }
          )
        );
        break;
      case "primaryButtonText":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, primaryButtonText: e.currentTarget.value }
          )
        );
        break;
      case "primaryButtonHyperlink":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, primaryButtonHyperlink: e.currentTarget.value }
          )
        );
        break;
      case "fullScreenImageUrl":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, fullScreenImageUrl: e.currentTarget.value }
          )
        );
        break;
      case "fullScreenImageWebpUrl":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, fullScreenImageWebpUrl: e.currentTarget.value }
          )
        );
        break;
      case "smallScreenImageUrl":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, smallScreenImageUrl: e.currentTarget.value }
          )
        );
        break;
      case "smallScreenImageWebpUrl":
        setDescriptions(
          descriptions.map((d, i) =>
            i !== descriptionIndex
              ? d
              : { ...d, smallScreenImageWebpUrl: e.currentTarget.value }
          )
        );
        break;
    }
  };

  const handleDescriptionBodyChange = (index: number, body: string) => {
    setDescriptions(
      descriptions.map((d, i) => (i !== index ? d : { ...d, body: body }))
    );
  };

  return (
    <>
      <Row className="mt-4">
        <Col>
          Descriptions: (Add in the same order you want to see in the website)
        </Col>
        <Col
          onClick={addDescription}
          style={{ cursor: "pointer" }}
          className="text-blue"
        >
          <i className="ni ni-fat-add mr-3" />
          Add Description
        </Col>
      </Row>
      {descriptions.map((d, i) => (
        <Row key={i} className="mt-4">
          <Col sm="1">
            <Button onClick={() => removeDescription(i)}>
              <i className="ni ni-fat-remove text-red" />
            </Button>
          </Col>
          <Col>
            <Row className="mt-2 align-items-center">
              <Col sm="2">Description Order : {d.order}</Col>
              <Col className="mr-4">
                <Row className="align-items-center">
                  <Col sm="1">Style: </Col>
                  <Col sm="2">
                    <Input
                      name={"style"}
                      type="select"
                      value={d.style}
                      onChange={(e) => {
                        descriptionChangeHandler(e, i);
                      }}
                    >
                      <option value="none">D1</option>
                      <option value="hexcode">D2</option>
                      <option value="hexcode">D3</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      name={"heading"}
                      type="text"
                      value={d.heading}
                      onChange={(e) => {
                        descriptionChangeHandler(e, i);
                      }}
                      placeholder="Heading (Optional)"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-3 align-items-center">
              <Col sm="4">
                <Input
                  name={"linkButtonText"}
                  type="text"
                  value={d.linkButtonText}
                  onChange={(e) => {
                    descriptionChangeHandler(e, i);
                  }}
                  placeholder="Link Button Text (Optional)"
                />
              </Col>
              <Col>
                <Input
                  name={"linkButtonHyperlink"}
                  type="text"
                  value={d.linkButtonHyperlink}
                  onChange={(e) => {
                    descriptionChangeHandler(e, i);
                  }}
                  placeholder="Link Button Hyperlink (Optional)"
                />
              </Col>
            </Row>
            <Row className="mt-3 align-items-center">
              <Col sm="4">
                <Input
                  name={"primaryButtonText"}
                  type="text"
                  value={d.primaryButtonText}
                  onChange={(e) => {
                    descriptionChangeHandler(e, i);
                  }}
                  placeholder="Primary Button Text (Optional)"
                />
              </Col>
              <Col>
                <Input
                  name={"primaryButtonHyperlink"}
                  type="text"
                  value={d.primaryButtonHyperlink}
                  onChange={(e) => {
                    descriptionChangeHandler(e, i);
                  }}
                  placeholder="Primary Button Hyperlink (Optional)"
                />
              </Col>
            </Row>
            <Row className="mt-3 align-items-center">
              <Col>
                <ReactQuill
                  value={d.body}
                  onChange={(b: string) => handleDescriptionBodyChange(i, b)}
                />
              </Col>
            </Row>
            {typeof d.assets !== "undefined" &&
              typeof d.assets[0] !== "undefined" && (
                <>
                  <Row className="mt-3 align-items-center">
                    <Col sm="4">
                      <Input
                        name={"fullScreenImageUrl"}
                        type="text"
                        value={d.assets[0].fullScreenImageUrl}
                        onChange={(e) => {
                          descriptionChangeHandler(e, i);
                        }}
                        placeholder="Full Screen Image URL (Optional)"
                      />
                    </Col>
                    <Col>
                      <Input
                        name={"fullScreenImageWebpUrl"}
                        type="text"
                        value={d.assets[0].fullScreenImageWebpUrl}
                        onChange={(e) => {
                          descriptionChangeHandler(e, i);
                        }}
                        placeholder="Full Screen Image Webp URL (Optional)"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3 align-items-center">
                    <Col sm="4">
                      <Input
                        name={"smallScreenImageUrl"}
                        type="text"
                        value={d.assets[0].smallScreenImageUrl}
                        onChange={(e) => {
                          descriptionChangeHandler(e, i);
                        }}
                        placeholder="Small Screen Image URL (Optional)"
                      />
                    </Col>
                    <Col>
                      <Input
                        name={"smallScreenImageWebpUrl"}
                        type="text"
                        value={d.assets[0].smallScreenImageWebpUrl}
                        onChange={(e) => {
                          descriptionChangeHandler(e, i);
                        }}
                        placeholder="Small Screen Image Webp URL (Optional)"
                      />
                    </Col>
                  </Row>
                </>
              )}
          </Col>
        </Row>
      ))}
    </>
  );
};

export default DescriptionCreate;
