import { ApiError } from './../../core/errors';
import { Collection } from "models/catalogue/Collection"
import { useRef, useContext, useState, useEffect } from "react"
import { AuthUserContext } from "session"
import { doApiRequestForHooks } from "data/utils"
import { COLLECTION_GET_ALL_ENDPOINT, COLLECTION_CREATE_ENDPOINT, COLLECTION_BULK_CREATE_ENDPOINT } from "constants/api-endpoints/catalogue"
import { BulkCreateResult } from "models/shared/BulkCreateResult"

export type CollectionCreateInfo = { name: string; slug: string }

const useCollectionsRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError>()
    const [message, setMessage] = useState("")
    const [collections, setCollections] = useState<Collection[]>([])
    const [bulkCreateResult, setBulkCreateResult] = useState<BulkCreateResult<Collection>>()


    async function getAll() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Collection[]>(_request, COLLECTION_GET_ALL_ENDPOINT, isMounted, setCollections, setLoading, setError, null, null)
    }

    async function create(name: string, slug: string) {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...COLLECTION_CREATE_ENDPOINT, data: { name, slug } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAll)

    }

    async function bulkCreate(categoriesInfo: CollectionCreateInfo[]) {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...COLLECTION_BULK_CREATE_ENDPOINT, data: categoriesInfo }
        doApiRequestForHooks<BulkCreateResult<Collection> | undefined>(_request, config, isMounted, setBulkCreateResult, setLoading, setError, setMessage, getAll)
    }

    useEffect(() => {
        getAll()
    }, [])

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return {
        collections,
        bulkCreate,
        bulkCreateResult,
        error,
        message,
        loading,
        getAll,
        create,
    }
}

export default useCollectionsRepository