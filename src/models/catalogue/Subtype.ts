import { Attribute } from "./Attribute";

export type Subtype = {
    id: number,
    sku: string,
    name: string,
    attributes: Attribute[]
}