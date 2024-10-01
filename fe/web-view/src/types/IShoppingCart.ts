export interface ProductDetail {
    id: number;
    product_name?: string;
    description?: string;
    stock?: number;
    price?: number;
    color?: string[];
    size?: string[];
    image?: string;
    rating?: number;
    sales?: number;
    weight?: number;
    category_id?: number;
}

export interface ProductInCart {
    quantity: number;
    sub_total: number;
    products: ProductDetail;
    selectedSize: string;
    selectedColor: string;
}

export interface ShoppingCartData {
    products: ProductInCart[];
    total: number;
    user_email: string;
}