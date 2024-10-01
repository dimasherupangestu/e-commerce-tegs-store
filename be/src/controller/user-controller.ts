import {Request, Response, NextFunction} from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, VerifyEmailRequest } from "../model/user_model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";
import cloudinary from "../libs/cloudinary";

export class UserController {
    static async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const request : VerifyEmailRequest = req.body as VerifyEmailRequest;
            const response = await UserService.verifyEmail(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.register(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            let request: UpdateUserRequest = {
                ...req.body,
                photo_profile: req.file ? req.file.filename : null,
            }

            let cloudinaryRes = null;

            if (request.photo_profile) {
                cloudinaryRes = await cloudinary.destination(request.photo_profile);
            }

            request = {
                ...request,
                photo_profile: cloudinaryRes
            }
            

            const response = await UserService.update(req.user!, request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    
}