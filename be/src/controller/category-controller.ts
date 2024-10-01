import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service/category-service";

export class CategoryController {
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const {categoryName} = req.params;
            const response = await CategoryService.get(categoryName);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
}