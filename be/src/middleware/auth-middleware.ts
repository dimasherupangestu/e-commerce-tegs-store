import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (token) {
        jwt.verify(token, "secret", async (err: any, decoded: any) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }

            const user = await prismaClient.user.findFirst({
                where: {
                    token: token
                }
            });

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
