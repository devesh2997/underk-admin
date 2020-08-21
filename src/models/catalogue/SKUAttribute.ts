import { SKUAttributeValue } from "./SKUAttributeValue";

export type SKUAttribute = {
    id?: number,
    name: string,
    skuOrdering: number,
    variantsBasis: boolean,
    isFilterable: boolean,
    isVisible: boolean,
    values: SKUAttributeValue[]
}