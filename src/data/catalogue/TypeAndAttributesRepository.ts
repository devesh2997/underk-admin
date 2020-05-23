import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Type from "models/catalogue/Type";
import { TYPE_GET_ALL_ENDPOINT, TYPE_CREATE_ENDPOINT, SUBTYPE_CREATE_ENDPOINT, ATTRIBUTE_CREATE_ENDPOINT, ATTRIBUTE_VALUE_CREATE_ENDPOINT } from "constants/api-endpoints/catalogue";
import { doApiRequestForHooks } from "data/utils";

const useTypeAndAttributesRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [types, setTypes] = useState<Type[]>([])

    async function getAllTypes() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Type[]>(_request, TYPE_GET_ALL_ENDPOINT, isMounted, setTypes, setLoading, setError, null, null)
    }

    async function createType(sku: string, name: string) {
        if (loading || !isMounted.current) return
        setError("")
        setMessage("")
        const config = { ...TYPE_CREATE_ENDPOINT, data: { sku, name } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAllTypes)

    }

    async function createSubtype(sku: string, name: string, typeSku: string) {
        if (loading || !isMounted.current) return
        setError("")
        setMessage("")
        const config = { ...SUBTYPE_CREATE_ENDPOINT, data: { sku, name, typeSku } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAllTypes)

    }

    async function createAttribute(name: string, subtypeSku: string) {
        if (loading || !isMounted.current) return
        setError("")
        setMessage("")
        const config = { ...ATTRIBUTE_CREATE_ENDPOINT, data: { name, subtypeSku } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAllTypes)
    }

    async function createAttributeValue(name: string, sku: string, attributeId: string, valueType: string, value: string) {
        if (loading || !isMounted.current) return
        setError("")
        setMessage("")
        const config = { ...ATTRIBUTE_VALUE_CREATE_ENDPOINT, data: { name, sku, attributeId, value, valueType } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAllTypes)
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
        message,
        loading,
        getAllTypes,
        createType,
        createSubtype,
        createAttribute,
        createAttributeValue
    }
}

export default useTypeAndAttributesRepository