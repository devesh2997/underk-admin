import { Subtype } from "./Subtype";

export default interface Type {
    id: number,
    sku: string,
    name: string,
    subtypes?: Subtype[]
}