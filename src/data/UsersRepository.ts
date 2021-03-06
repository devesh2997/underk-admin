import { ApiError } from './../core/errors';
import { useRef, useContext, useState, useEffect } from "react"
import { AuthUserContext } from "session"
import { User } from "models/User"
import { doApiRequestForHooks } from "./utils"
import { USER_GET_ALL_ENDPOINT, USER_CREATE_ENDPOINT } from "constants/api-endpoints/users"

const useUsersRepository = () => {

    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError>()
    const [message, setMessage] = useState("")
    const [users, setUsers] = useState<User[]>([])

    async function getAll() {
        if (loading || !isMounted.current) return
        setError(undefined)
        doApiRequestForHooks<User[]>(_request, USER_GET_ALL_ENDPOINT, isMounted, setUsers, setLoading, setError, null, null)
    }

    async function create(userInfo: User) {
        if (loading || !isMounted.current) return
        setError(undefined)
        const config = { ...USER_CREATE_ENDPOINT, data: userInfo }
        doApiRequestForHooks<User[]>(_request, config, isMounted, null, setLoading, setError, setMessage, getAll)
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
        users, error, message, loading, getAll, create
    }

}

export default useUsersRepository