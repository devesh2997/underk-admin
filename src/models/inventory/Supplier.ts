export type Supplier = {
    id: number
    suid: string
    sku: string
    firstName: string
    lastName?: string | undefined
    email: string
    mobileCountryCode: string
    mobileNumber: number
    dob: Date
    gender: string
    picUrl?: string
    address: string
    created_at: Date
    updated_at: Date
}