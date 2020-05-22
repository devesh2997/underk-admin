import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthUserContext } from "session";
import { ApiResponse } from "../../session/AuthUserProvider";
import Type from "models/catalogue/Type";
import { TO, TE } from "utils";
import { URLS, HTTP_METHODS } from "../../constants";

const useTypeRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [types, setTypes] = useState<Type[]>([])

    async function getAll() {
        console.log('here')
        if (loading) return
        if (isMounted.current) setLoading(true)
        let err: any, res: ApiResponse<Type[]>

        [err, res] = await TO(authUser.doRequest({
            method: HTTP_METHODS.GET,
            url: URLS.TYPE_GET_ALL_URL,
        }))
        if (err) TE(err)
        if (isMounted.current) setLoading(false)
        if (res.success) {
            if (typeof res.data !== 'undefined')
                if (isMounted.current) setTypes(res.data)
                else
                    if (isMounted.current) setError("Some error occurred")
        } else {
            if (isMounted.current) setError(res.error as string)
        }
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
        types,
        error,
        loading,
        getAll
    }
}

export default useTypeRepository