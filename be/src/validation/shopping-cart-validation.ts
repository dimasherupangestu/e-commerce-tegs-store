import { ZodType, z } from "zod";

export class ShoppingCartValidation {
    
    static readonly ADD_TO_CART : ZodType = z.object({
        product_id: z.number().positive(),
        quantity: z.number().positive(),
        selectedSize: z.string(),
        selectedColor: z.string()
    })
}