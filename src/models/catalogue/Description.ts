import { DescriptionAsset } from './DescriptionAsset';
export type Description = {
    id?: number,
    order: number,
    style?: string,
    heading?: string,
    body?: string,
    assets?: DescriptionAsset[]
    linkButtonText?: string,
    linkButtonHyperlink?: string,
    primaryButtonText?: string,
    primaryButtonHyperlink?: string,
}