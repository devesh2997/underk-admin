import { Attribute } from "./Attribute";
import { SKUAttribute } from "./SKUAttribute";
import { OptionAttribute } from "./OptionAttribute";

export type Subtype = {
    id: number,
    sku: string,
    name: string,
    attributes?: Attribute[],
    skuAttributes: SKUAttribute[],
    optionAttribute?: OptionAttribute
}