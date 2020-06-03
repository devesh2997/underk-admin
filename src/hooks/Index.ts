import { useState } from "react"
import { Address } from "models/shared/Address"

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

export type SetAddressHook = {
    handleBuildingChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleLocalityChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleLandmarkChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleCityChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleStateChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePincodeChange: (e: React.FormEvent<HTMLInputElement>) => void;

}

//hook for address forms 
export const useAddressForm = (initialAddress: Address): { address: Address, setAddress: SetAddressHook } => {
    const [building, setBuilding] = useState(initialAddress.building)
    const [locality, setLocality] = useState(initialAddress.locality)
    const [landmark, setLandmark] = useState(initialAddress.landmark)
    const [city, setCity] = useState(initialAddress.city)
    const [state, setState] = useState(initialAddress.state)
    const [pincode, setPincode] = useState(initialAddress.pincode)

    const handleBuildingChange = (e: React.FormEvent<HTMLInputElement>) => {
        setBuilding(e.currentTarget.value)
    }

    const handleLocalityChange = (e: React.FormEvent<HTMLInputElement>) => {
        setLocality(e.currentTarget.value)
    }

    const handleLandmarkChange = (e: React.FormEvent<HTMLInputElement>) => {
        setLandmark(e.currentTarget.value)
    }

    const handleCityChange = (e: React.FormEvent<HTMLInputElement>) => {
        setCity(e.currentTarget.value)
    }

    const handleStateChange = (e: React.FormEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }

    const handlePincodeChange = (e: React.FormEvent<HTMLInputElement>) => {
        setPincode(Number(e.currentTarget.value))
    }

    return {
        address: { building, locality, landmark, city, state, pincode },
        setAddress: {
            handleBuildingChange,
            handleLandmarkChange,
            handleLocalityChange,
            handleCityChange,
            handleStateChange,
            handlePincodeChange
        }
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