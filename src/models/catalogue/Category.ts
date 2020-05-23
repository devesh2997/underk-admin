export type Category = {
    id?: number,
    slug: string,
    sku: string,
    name: string,
    children?: Category[]
}