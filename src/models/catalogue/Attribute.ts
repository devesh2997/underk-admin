import { AttributeValue } from "./AttributeValue";

export type Attribute = {
    id?: number,
    name: string,
    isMultiValued: boolean,
    isCompulsory: boolean,
    isFilterable: boolean,
    isVisible: boolean,
    values: AttributeValue[]
}