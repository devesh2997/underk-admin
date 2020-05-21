import { useState } from "react"

//hook for input fields
export const useFormInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return {
        value,
        onChange: handleChange
    }
}

//hook for selectting tabs
export const useTabSelect = (initialTab: number) => {
    const [value, setValue] = useState(initialTab)

    const handleTabChange = (e: React.MouseEvent<HTMLElement>, activeTab: number) => {
        e.preventDefault()
        setValue(activeTab)
    }

    return {
        activeTab: value,
        toggleActiveTab: handleTabChange
    }
}