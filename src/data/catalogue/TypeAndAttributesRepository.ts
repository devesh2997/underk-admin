import { ApiError } from './../../core/errors';
import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Type from "models/catalogue/Type";
import { TYPE_GET_ALL_ENDPOINT, TYPE_CREATE_ENDPOINT, SUBTYPE_CREATE_ENDPOINT, ATTRIBUTE_CREATE_ENDPOINT, ATTRIBUTE_VALUE_CREATE_ENDPOINT, ATTRIBUTE_VALUE_BULK_CREATE_ENDPOINT } from "constants/api-endpoints/catalogue";
import { doApiRequestForHooks } from "data/utils";
import { AttributeValue } from "models/catalogue/AttributeValue";
import { BulkCreateResult } from "models/shared/BulkCreateResult";
import { Attribute } from "models/catalogue/Attribute";
import { SKUAttribute } from "models/catalogue/SKUAttribute";
import { OptionAttribute } from "models/catalogue/OptionAttribute";
import { Description } from '../../models/catalogue/Description';

export type AttributeValueCreateInfo = {
    sku: string,
    name: string,
    attributeId: number,
    valueType?: string,
    value: string
}

export type SubtypeCreateFunc = (sku: string, name: string, typeSku: string, attributes: Attribute[], skuAttributes: SKUAttribute[], optionAttribute?: OptionAttribute, descriptions?: Description[]) => Promise<void>

const useTypeAndAttributesRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError>()
    const [message, setMessage] = useState("")
    const [types, setTypes] = useState<Type[]>([])

    const [bulkCreateAttributeValueResult, setBulkCreateAttributeValueResult] = useState<BulkCreateResult<AttributeValue>>()


    async function getAllTypes() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Type[]>(_request, TYPE_GET_ALL_ENDPOINT, isMounted, setTypes, setLoading, setError, null, null)
    }

    async function createType(sku: string, name: string) {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...TYPE_CREATE_ENDPOINT, data: { sku, name } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAllTypes)

    }


    const createSubtype: SubtypeCreateFunc = async (sku, name, typeSku, attributes, skuAttributes, optionAttribute, descriptions) => {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...SUBTYPE_CREATE_ENDPOINT, data: { sku, name, typeSku, attributes, skuAttributes, optionAttribute, descriptions } }
        console.log(config)
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAllTypes)

    }

    async function bulkCreateAttributeValue(attributeValuesInfo: AttributeValueCreateInfo[]) {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...ATTRIBUTE_VALUE_BULK_CREATE_ENDPOINT, data: attributeValuesInfo }
        doApiRequestForHooks<BulkCreateResult<AttributeValue> | undefined>(_request, config, isMounted, setBulkCreateAttributeValueResult, setLoading, setError, setMessage, getAllTypes)

    }

    useEffect(() => {
        getAllTypes()
    }, [])

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return {
        types,
        error,
        bulkCreateAttributeValueResult,
        bulkCreateAttributeValue,
        message,
        loading,
        getAllTypes,
        createType,
        createSubtype,
    }
}

export default useTypeAndAttributesRepository