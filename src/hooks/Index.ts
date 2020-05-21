import { useState } from "react"

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