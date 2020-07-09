import { Dimensions } from "models/catalogue/Dimensions";
import { Price } from "models/catalogue/Price";


export type BulkUploadProductCreateInfo = {
    productNumber: number,
    productInfo: ProductCreateInfo
}

export type ProductCreateInfo = {
    title: string
    slug: string
    typeName: string
    subtypeName: string
    categorySlug: string
    collectionsSlugs: string[]
    productAttributeValues?: {
        attributeName: string,
        attributeValueName?: string
        attributeValueNames?: string[]
    }[]
    productSKUAttributeValues: {
        skuAttributeName: string,
        skuAttributeValueName: string
    }[]
    productOptionAttributeValues?: {
        optionAttributeValueName: string,
        optionAttributeValueDimensions: Dimensions,
        optionAttributeValuePrice: Price,
        optionAttributeValueInventory?: {
            warehouseCode: string,
            stock: number
        }[]
    }[],
    price?: Price,
    productDimensions?: Dimensions,
    productInventory?: {
        warehouseCode: string,
        stock: number
    }[]
};