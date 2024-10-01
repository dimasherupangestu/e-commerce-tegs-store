import { Product, Category } from "@prisma/client";

export type ProductResponse = {
    id: number;
    product_name: string;
    stock: number;
    price: number;
    size: string[];
    image: string[];
    color: string[];
    description: string | null;
    rating: number | null;
    sales: number;
    weight: number;
    category: {
        id: number;
        category_name: string;
    } | null;
};

export type CreateProductRequest = {
    shopping_cart_id?: number | null;
    product_name : string;
    stock: number;
    price: number;
    size: string[];
    image: string[];
    description: string;
    rating: number;
    color: string[];
    sales: number;
    weight: number;
    category_id: number;
}

export type UpdateProductRequest = {
    id?: number;
    product_name? : string;
    stock?: number;
    price?: number;
    size?: string[];
    image?: string[];
    color?: string[];
    description?: string;
    rating?: number;
    sales?: number;
    weight?: number;
    category_id?: number;
}

export interface SearchProductRequest {
    query?: string;
    product_name?: string;
    description?: string;
    category?: { category_name?: string };
    min_price?: number; 
    max_price?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export function toProductResponse(product: Product & { category?: {
    id: number; category_name: string; 
} | null }): ProductResponse {
    return {
        id: product.id,
        product_name: product.product_name,
        stock: product.stock,
        price: product.price,
        size: product.size,
        color: product.color,
        image: product.image,
        description: product.description,
        rating: product.rating,
        sales: product.sales,
        weight: product.weight,
        category: product.category
            ? {
                  id: product.category.id,
                  category_name: product.category.category_name,
              }
            : null,
    };
}

