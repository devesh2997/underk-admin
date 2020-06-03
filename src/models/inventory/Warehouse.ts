import { Address } from "../../models/shared/Address";

export type Warehouse = {
    id?: number
    code: string
    name: string
    address: Address
    created_at?: Date
    updated_at?: Date
}
