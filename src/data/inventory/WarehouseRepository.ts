import { useRef, useContext, useState, useEffect } from "react"
import { AuthUserContext } from "../../session"
import { Warehouse } from "../../models/inventory/Warehouse"
import { WAREHOUSE_GET_ALL_ENDPOINT, WAREHOUSE_CREATE_ENDPOINT } from "../../constants/api-endpoints/inventory"
import { doApiRequestForHooks } from "../../data/utils"
import { Address } from "../../models/shared/Address"

const useWarehouseRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])

    async function getAll() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Warehouse[]>(_request, WAREHOUSE_GET_ALL_ENDPOINT, isMounted, setWarehouses, setLoading, setError, null, null)
    }

    async function create(name: string, code: string, address: Address) {
        if (loading || !isMounted.current) return
        setError("")
        setMessage("")
        const config = { ...WAREHOUSE_CREATE_ENDPOINT, data: { name, code, address } }
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
        warehouses,
        error,
        message,
        loading,
        getAll,
        create
    }

}

export default useWarehouseRepository