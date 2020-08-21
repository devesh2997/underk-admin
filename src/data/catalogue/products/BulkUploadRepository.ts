import { ProductAsset } from './../../../models/catalogue/ProductAsset';
import { useEffect, useState } from 'react';
import { doApiRequestForHooks } from 'data/utils';
import { ApiError } from './../../../core/errors';
import { AuthUserContext } from 'session';
import { useContext } from 'react';
import { useRef } from 'react';
import { Dimensions } from "models/catalogue/Dimensions";
import { Price } from "models/catalogue/Price";
import { Product } from '../../../models/catalogue/Product';
import { PRODUCT_BULK_UPLOAD } from '../../../constants/api-endpoints/catalogue';


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
    }[],
    assets?: ProductAsset[]
};

export type BulkUploadResult = {
    products: Product[]
    errors: ApiError[]
}

const useProductsBulkUploadRepository = () => {
    const isMounted = useRef(true);

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError>()
    const [message, setMessage] = useState("")
    const [result, setResult] = useState<BulkUploadResult>()

    async function bulkUpload(productsInfo: ProductCreateInfo[]) {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...PRODUCT_BULK_UPLOAD, data: productsInfo }
        doApiRequestForHooks<BulkUploadResult | undefined>(_request, config, isMounted, setResult, setLoading, setError, setMessage, null)
    }

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return { loading, error, message, result, bulkUpload }

}

export default useProductsBulkUploadRepository