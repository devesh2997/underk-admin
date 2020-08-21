import { ApiError } from './../../core/errors';
import { Category } from "models/catalogue/Category"
import { useRef, useContext, useState, useEffect } from "react"
import { AuthUserContext } from "session"
import { doApiRequestForHooks } from "data/utils"
import { CATEGORY_GET_ALL_ENDPOINT, CATEGORY_CREATE_ENDPOINT, CATEGORY_BULK_CREATE_ENDPOINT } from "constants/api-endpoints/catalogue"
import { BulkCreateResult } from "models/shared/BulkCreateResult"


export type CategoryCreateInfo = {
    name: string;
    slug: string;
    parentSlug: string;
};
const useCategoriesRepository = () => {
    const isMounted = useRef(true)

    const authUser = useContext(AuthUserContext)
    const _request = authUser.doRequest

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ApiError>()
    const [message, setMessage] = useState("")
    const [categories, setCategories] = useState<Category[]>([])

    const [bulkCreateResult, setBulkCreateResult] = useState<BulkCreateResult<Category>>()

    const [categoriesFlatArray, setCategoriesFlatArray] = useState<Category[] | undefined>(<Category[]>[])

    function getCategoryRecursive(
        rows: Category[] | undefined,
        category: Category
    ): Category[] | undefined {
        if (typeof category === "undefined") return;
        if (typeof rows === "undefined") return;
        rows.push(
            { id: category.id, name: category.name, slug: category.slug, sku: category.sku }
        );
        if (typeof category.children !== "undefined") {
            for (let i = 0; i < category.children.length; i++) {
                rows = getCategoryRecursive(rows, category.children[i]);
            }
        }
        return rows;
    }

    async function getAll() {
        if (loading || !isMounted.current) return
        doApiRequestForHooks<Category[]>(_request, CATEGORY_GET_ALL_ENDPOINT, isMounted, setCategories, setLoading, setError, null, null)
    }

    async function create(name: string, slug: string, parentSlug: string) {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...CATEGORY_CREATE_ENDPOINT, data: { name, slug, parentSlug } }
        doApiRequestForHooks<null>(_request, config, isMounted, null, setLoading, setError, setMessage, getAll)

    }

    async function bulkCreate(categoriesInfo: CategoryCreateInfo[]) {
        if (loading || !isMounted.current) return
        setError(undefined)
        setMessage("")
        const config = { ...CATEGORY_BULK_CREATE_ENDPOINT, data: categoriesInfo }
        doApiRequestForHooks<BulkCreateResult<Category> | undefined>(_request, config, isMounted, setBulkCreateResult, setLoading, setError, setMessage, getAll)

    }

    useEffect(() => {
        let cats: Category[] | undefined = []
        for (let i = 0; i < categories.length; i++) {
            cats = getCategoryRecursive(cats, categories[i])
        }
        setCategoriesFlatArray(cats)
    }, [categories])

    useEffect(() => {
        getAll()
    }, [])

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return {
        categories,
        categoriesFlatArray,
        bulkCreateResult,
        bulkCreate,
        error,
        message,
        loading,
        getAll,
        create,
    }
}

export default useCategoriesRepository