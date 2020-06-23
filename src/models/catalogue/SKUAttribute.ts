import { SKUAttributeValue } from "./SKUAttributeValue";

export type SKUAttribute = {
    id?: number,
    name: string,
    skuOrdering: number,
    variantsBasis: boolean,
    isFilterable: boolean,
    values: SKUAttributeValue[]
}