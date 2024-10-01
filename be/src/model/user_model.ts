import { User } from "@prisma/client";

export type UserResponse = {
    full_name: string | null;
    email: string;
    phone_number: string | null;
    photo_profile: string | null;
    street: string | null;
    city: string | null;
    province: string | null;
    country: string | null;
    city_id: number | null;
    postal_code: string | null;
    token? : string;
}

export type VerifyEmailRequest = {
    email: string;
}

export type CreateUserRequest = {
    email: string;
    username : string;
    password : string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    full_name?: string;
    password?: string;
    phone_number?: string;
    photo_profile?: string;
    street?: string;
    city?: string;
    province?: string;
    country?: string;
    postal_code?: string;
}

export function toUserResponse(user: User): UserResponse {
    return {
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        photo_profile: user.photo_profile,
        street: user.street,
        city: user.city,
        province: user.province,
        country: user.country,
        city_id: user.city_id,
        postal_code: user.postal_code,
    }
}