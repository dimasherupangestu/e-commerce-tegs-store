import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response.error";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, VerifyEmailRequest, toUserResponse } from "../model/user_model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RajaOngkirService } from "./delivery-service";

export class UserService {
    static async verifyEmail(request: VerifyEmailRequest) : Promise<UserResponse> {
        const verifyEmailRequest = Validation.validate(UserValidation.VERIFYEMAIL, request);
        
        const user = await prismaClient.user.findUnique({
            where: {
                email: verifyEmailRequest.email
            }
        })

        if (!user) {
            throw new ResponseError(400, "Email not registered");
        }

        return toUserResponse(user);
    }

    static async registerEmail(request: CreateUserRequest) {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        });

        if(totalUserWithSameEmail != 0) {
            throw new ResponseError(400, "Email already exists");
        }
        const verification = await prismaClient.emailVerification.findUnique({
            where: {
                email: registerRequest.email
            }
        });

        if (!verification || !verification.verified) {
            throw new ResponseError(400, "Please verify your email");
        }

    }
    
    static async register(request: CreateUserRequest) : Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        });

        if(totalUserWithSameEmail != 0) {
            throw new ResponseError(400, "Email already exists");
        }

        const verification = await prismaClient.emailVerification.findUnique({
            where: {
                email: registerRequest.email
            }
        });

        if (!verification || !verification.verified) {
            throw new ResponseError(400, "Please verify your email");
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        });

        return toUserResponse(user);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        }
    });

    if (!user) {
        throw new ResponseError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password is wrong");
    }

    const obj = {
        email: user.email
    }

    const token = jwt.sign({ obj }, "secret", { expiresIn: "1h" });

    user = await prismaClient.user.update({
        where: {
            email: loginRequest.email
        },
        data: {
            token: token
        }
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }
    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        if(updateRequest.full_name) {
            user.full_name = updateRequest.full_name;
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }

        if (updateRequest.phone_number) {
            user.phone_number = updateRequest.phone_number;
        }

        if (updateRequest.photo_profile) {
            user.photo_profile = updateRequest.photo_profile;
        }

        if (updateRequest.street) {
            user.street = updateRequest.street;
        }

        if (updateRequest.city) {
            const city_id = await RajaOngkirService.getCityId(updateRequest.city);
            // console.log(city_id);
            if (!city_id) {
                throw new ResponseError(400, "Invalid city name");
            }
            user.city_id = city_id;
            user.city = updateRequest.city;
        }

        if (updateRequest.country) {
            user.country = updateRequest.country;
        }

        if (updateRequest.province) {
            user.province = updateRequest.province;
        }
        
        if (updateRequest.postal_code) {
            user.postal_code = updateRequest.postal_code;
        }

        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: user
        });

        return toUserResponse(result);
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: {
                token: null
            }
        });
        return toUserResponse(result);
    }
}