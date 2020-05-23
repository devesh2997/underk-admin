import { Collection } from "models/catalogue/Collection"
import { useRef, useContext, useState, useEffect } from "react"
import { AuthUserContext } from "session"
import { doApiRequestForHooks } from "data/utils"
import { COLLECTION_GET_ALL_ENDPOINT, COLLECTION_CREATE_ENDPOINT } from "constants/api-endpoints/catalogue"

const useCollectionsRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [collections, setCollections] = useState<Collection[]>([])

    async function getAll() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Collection[]>(_request, COLLECTION_GET_ALL_ENDPOINT, isMounted, setCollections, setLoading, setError, null, null)
    }

    async function create(name: string, slug: string) {
        if (loading || !isMounted.current) return
        setError("")
        setMessage("")
        const config = { ...COLLECTION_CREATE_ENDPOINT, data: { name, slug } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAll)

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
        error,
        message,
        loading,
        getAll,
        create,
    }
}

export default useCollectionsRepository