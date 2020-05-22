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

//hook for checkbox input fields
export const useCheckboxInput = (initialValue: boolean) => {
    const [checked, setValue] = useState(initialValue)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.checked)
    }

    return {
        checked,
        onChange: handleChange
    }
}

//hook for selecting tabs
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