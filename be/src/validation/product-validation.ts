import { ZodType, z } from "zod";

export class ProductValidation {

    static readonly CREATE : ZodType = z.object({
        product_name: z.string().min(1).max(100),
        stock: z.number().min(1),
        price: z.number().min(1),
        size: z.array(z.string()),
        color: z.array(z.string()),
        image: z.array(z.string()),
        description: z.string().optional(),
        rating: z.number().optional(),
        sales: z.number().optional(),
        weight: z.number().optional(),
        category_id: z.number().min(1)
    })

    static readonly UPDATE : ZodType = z.object({
        id: z.number().positive(),
        product_name: z.string().min(1).max(100).optional(),
        stock: z.number().min(1).optional(),
        price: z.number().min(1).optional(),
        size: z.array(z.string()).optional(),
        image: z.array(z.string()).optional(),
        description: z.string().optional(),
        rating: z.number().optional(),
        sales: z.number().optional(),
        weight: z.number().optional(),
        category_id: z.number().min(1).optional()
    })

    static readonly SEARCH : ZodType = z.object({
        product_name: z.string().min(1).optional(),
        deskripsi: z.string().min(1).optional(),
        category: z.object({ name_category: z.string().min(1).optional() }).optional(),
        // name_category: z.string().min(1).optional()
    })
}