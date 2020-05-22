export type User = {
    id?: number
    uuid?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    mobileCountryCode?: string,
    mobileNumber?: number,
    dob?: Date,
    gender?: string,
    picUrl?: string,
    emailVerified: boolean,
    mobileVerified: boolean,
    created_at?: Date,
    updated_at?: Date

}