    import { Product, ShoppingCart, ShoppingCartItem } from "@prisma/client";

    export type ShoppingCartResponse = {
        quantity: number;
        total: number;
        user_email: string;
        selectedSize? : string | null;
        selectedColor? : string | null;
        product_id: number;
        shoppingCartItem: {
            quantity: number;
            total: number;
            product_id: number;
            user_email: string;
            shoppingCartId: number;
        }
    }

    export type ShoppingCartItemResponse = {
        quantity: number;
        total: number;
        shoppingCartId: number;
        user_email: string;
        productId: number;
        product: {
            id: number;
            product_name: string;
            stock: number;
            price: number;
            size: string[];
            image: string[];
            color: string[];
            description: string;
            rating: number;
            category_id: number;
        }
    } 

    export type CreateShoppingCartRequest = {
        quantity: number;
        total: number;
        selectedSize? : string;
        selectedColor? : string;
        product_id: number;
        user_email: string;
    }

    export type UpdateShoppingCartRequest = {
        newQuantity: number;
        total: number;
        selectedSize?: string;
        selectedColor?: string;
        product_id: number;
        user_email: string;
    }

    export type UpdatedCartItemResponse = {
        product_id: number;
        quantity: number;
        selectedColor?: string | null;
        selectedSize?: string | null;
        sub_total: number;
        total: number;
        user_email: string;
    };
    

    export function toShoppingCartResponse(
        shoppingCart: ShoppingCart,
        shoppingCartItem: ShoppingCartItem,
    ): ShoppingCartResponse {
        return {
            quantity: shoppingCartItem.quantity,
            total: shoppingCartItem.total,
            selectedSize: shoppingCartItem.selectedSize,
            selectedColor: shoppingCartItem.selectedColor,
            user_email: shoppingCart.user_email, 
            product_id: shoppingCartItem.productId,
            shoppingCartItem: {
                quantity: shoppingCartItem.quantity,
                total: shoppingCartItem.total,
                product_id: shoppingCartItem.productId,
                user_email: shoppingCart.user_email,
                shoppingCartId: shoppingCartItem.shoppingCartId
            }
        };
    }
    
    

    // export function toShoppingCartItemResponse(
    //     shoppingCartItem: ShoppingCartItem,
    //     product: Product,
    //     shoppingCartId: number,
    //     userEmail: string
    // ): ShoppingCartItemResponse {
    //     return {
    //         quantity: shoppingCartItem.quantity,
    //         total: shoppingCartItem.total,
    //         shoppingCartId: shoppingCartId,
    //         user_email: userEmail,
    //         productId: product.id,
    //         product: {
    //             id: product.id,
    //             product_name: product.product_name,
    //             stock: product.stock,
    //             price: product.price,
    //             size: product.size,
    //             image: product.image,
    //             color: product.color,
    //             description: product.description,
    //             rating: product.rating,
    //             category_id: product.category_id
    //         }
    //     };
    // }
    
    
    export type Products = {
        id: number;
        product_name: string;
        stock: number;
        price: number;
        size: string[];
        image: string[];
        color: string[];
        description: string;
        rating: number;
        category_id: number;
    }
    
    export type CartProduct = {
        products: Products;
        selectedSize: string | null;
        selectedColor: string | null;
        quantity: number;
        sub_total: number;
    }
    
    export type ShoppingCartResponseItem = {
        user_email: string;
        products: CartProduct[];
        total: number;
    }
    
    export function toShoppingCartItemResponse(
        shoppingCartWithDetails: {
            user_email: string;
            products: CartProduct[];
            total: number;
        }
    ): ShoppingCartResponseItem{
        return {
            user_email: shoppingCartWithDetails.user_email,
            total: shoppingCartWithDetails.total,
            products: shoppingCartWithDetails.products
        };
    }
       


