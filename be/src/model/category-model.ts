import { Category, Product } from "@prisma/client";

export type CategoryResponse = {
    id: number;
    category_name: string;
    products: {
        id: number;
        product_name: string;
        stock: number;
        price: number;
        size: string[];
        image: string[];
        color: string[];
        description: string | null;
        rating: number | null;
    }[];
};

export function toCategoryResponse(category: Category & { products: Product[] }): CategoryResponse {
    return {
        id: category.id,
        category_name: category.category_name,
        products: category.products.map(product => ({
            id: product.id,
            product_name: product.product_name,
            stock: product.stock,
            price: product.price,
            size: product.size,
            image: product.image,
            color: product.color,
            description: product.description,
            rating: product.rating,
        })),
    };
}
