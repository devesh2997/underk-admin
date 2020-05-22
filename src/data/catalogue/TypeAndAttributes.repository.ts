import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import { ApiResponse } from "../../session/AuthUserProvider";
import Type from "models/catalogue/Type";
import { TO, TE } from "utils";
import { TYPE_GET_ALL_ENDPOINT } from "constants/api-endpoints/catalogue";
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
        doApiRequestForHooks<Type[]>(_request, TYPE_GET_ALL_ENDPOINT, isMounted, setTypes, setLoading, setError)
        // setLoading(true)
        // let err: any, res: ApiResponse<Type[]>

        // [err, res] = await TO(_request(TYPE_GET_ALL_ENDPOINT))
        // if (err) TE(err)
        // if (isMounted.current) setLoading(false)
        // if (res.success) {
        //     if (typeof res.data !== 'undefined') {
        //         if (isMounted.current) setTypes(res.data)
        //     }
        //     else
        //         if (isMounted.current) setError("Some error occurred")
        // } else {
        //     if (isMounted.current) setError(res.error as string)
        // }
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
        getAllTypes
    }
}

export default useTypeAndAttributesRepository