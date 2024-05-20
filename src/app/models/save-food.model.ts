export interface ISaveFood {
    id?: number,
    name: string;
    description: string;
    price: number,
    discountType: number,
    discount: number,
    discountPrice: number,
    image: string,
    base64?: string
}