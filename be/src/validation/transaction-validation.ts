import { ZodType, z } from "zod";

const deliveryCostSchema = z.object({
    value: z.number().nonnegative(),
    etd: z.string().optional(),
    note: z.string().optional()
});

const deliveryDetailsSchema = z.object({
    service: z.string().min(1).max(100), 
    description: z.string().min(1).max(255),
    cost: z.array(deliveryCostSchema).default([])
});

export class TransactionValidation {
    static readonly CREATE : ZodType = z.object({
        total : z.number().positive().optional(),
        status : z.string().min(1).max(100).optional(),
        customer_name : z.string().min(1).max(100).optional(),
        customer_email : z.string().min(1).max(100).optional(),
        delivery_details : deliveryDetailsSchema.optional(),
        snap_token : z.string().min(1).max(100).optional(),
        snap_redirect_url : z.string().min(1).max(100).optional(),
        payment_method : z.string().min(1).max(100).optional(),
        created_at : z.date().optional(),
        updated_at : z.date().optional(),
    })
}