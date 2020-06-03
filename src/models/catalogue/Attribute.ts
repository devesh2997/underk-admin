import { AttributeValue } from "./AttributeValue";

export type Attribute = {
    id: number,
    name: string,
    skuOrdering: number,
    variantsBasis: boolean,
    values: AttributeValue[]
}