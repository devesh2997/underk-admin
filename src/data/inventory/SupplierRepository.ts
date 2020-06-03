import { useRef, useContext, useState, useEffect } from "react"
import { AuthUserContext } from "session"
import { Supplier } from "models/inventory/Supplier"
import { doApiRequestForHooks } from "data/utils"
import { SUPPLIER_GET_ALL_ENDPOINT, SUPPLIER_CREATE_ENDPOINT } from "constants/api-endpoints/inventory"

export type SupplierCreateInfo = {
    sku: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileCountryCode: string,
    mobileNumber: number,
    dob: Date,
    gender: string,
    picUrl?: string,
    address: string,
}

const useSupplierRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [suppliers, setSuppliers] = useState<Supplier[]>([])

    async function getAll() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Supplier[]>(_request, SUPPLIER_GET_ALL_ENDPOINT, isMounted, setSuppliers, setLoading, setError, null, null)
    }

    async function create(supplierCreateInfo: SupplierCreateInfo ) {
        if (loading || !isMounted.current) return
        setError("")
        setMessage("")
        const config = { ...SUPPLIER_CREATE_ENDPOINT, data: supplierCreateInfo }
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
        suppliers,
        error,
        message,
        loading,
        getAll,
        create
    }
}

export default useSupplierRepository