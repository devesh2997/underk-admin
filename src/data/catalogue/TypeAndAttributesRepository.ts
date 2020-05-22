import { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import Type from "models/catalogue/Type";
import { TYPE_GET_ALL_ENDPOINT, TYPE_CREATE_ENDPOINT } from "constants/api-endpoints/catalogue";
import { doApiRequestForHooks } from "data/utils";

const useTypeAndAttributesRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [types, setTypes] = useState<Type[]>([])

    async function getAllTypes() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Type[]>(_request, TYPE_GET_ALL_ENDPOINT, isMounted, setTypes, setLoading, setError, null)
    }

    async function createType(sku: string, name: string) {
        if (loading || !isMounted.current) return
        const config = { ...TYPE_CREATE_ENDPOINT, data: { sku, name } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, getAllTypes)

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
        loading,
        getAllTypes,
        createType
    }
}

export default useTypeAndAttributesRepository