import { prismaClient } from "../application/database";
import { CategoryResponse, toCategoryResponse } from "../model/category-model";

export class CategoryService {
    static async get(categoryName: string): Promise<CategoryResponse[] | null> {
        const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
        const categorys = await prismaClient.category.findMany({
            where: {
                category_name: capitalizedCategoryName,
            },
            include: {
                products: true
            }
        });

        const categoryResponse = categorys.map(category => toCategoryResponse(category));
        return categoryResponse;
    }
}
