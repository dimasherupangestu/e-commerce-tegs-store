import { ZodType, z } from "zod";

export class UserValidation {
    static readonly VERIFYEMAIL: ZodType = z.object({
        email: z.string().min(3).max(100),
    })

    static readonly REGISTER : ZodType = z.object({
        email: z.string().min(3).max(100),
        full_name: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    });

    static readonly LOGIN : ZodType = z.object({
        email: z.string().min(3).max(100),
        password: z.string().min(1).max(100),
    });

    static readonly UPDATE : ZodType = z.object({
        username: z.string().min(1).max(100).optional().nullable(),
        full_name: z.string().min(1).max(100).optional().nullable(),
        password: z.string().min(1).max(100).optional().nullable(),
        phone_number: z.string().min(1).max(100).optional().nullable(),
        photo_profile: z.string().min(1).max(100).optional().nullable(),
        street: z.string().min(1).max(100).optional().nullable(),
        city: z.string().min(1).max(100).optional().nullable(),
        province: z.string().min(1).max(100).optional().nullable(),
        country: z.string().min(1).max(100).optional().nullable(),
        postal_code: z.string().min(1).max(100).optional().nullable(),
    });
}