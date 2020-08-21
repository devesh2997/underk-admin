import { Category } from './Category';
import { Collection } from 'underk-utils/dist/types';
export type Product = {
    id: number,
    pid: string,
    slug: string,
    title: string,
    category: Category,
    collections: Collection[]
}