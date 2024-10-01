import { User, Product } from "@prisma/client";
import { CreateProductRequest, ProductResponse, SearchProductRequest, UpdateProductRequest, toProductResponse } from "../model/product_model";
import { ProductValidation } from "../validation/product-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response.error";

export class ProductService {
    static async create(user: User, request: CreateProductRequest): Promise<ProductResponse> {
        const createProductRequest = Validation.validate(ProductValidation.CREATE, request);
    
        const record = {
            product_name: createProductRequest.product_name,
            stock: createProductRequest.stock,
            price: createProductRequest.price,
            size: createProductRequest.size,
            color: createProductRequest.color,
            image: createProductRequest.image,
            description: createProductRequest.description,
            rating: createProductRequest.rating,
            sales: createProductRequest.sales,
            weight: createProductRequest.weight,
            category: {
                connect: {
                    id: createProductRequest.category_id
                }
            }
        };

        const product = await prismaClient.product.create({
            data: record,
            include: {
                category: true
            }
        });

        return toProductResponse(product);
    }
    

    static async checkProductMustExists(email: string, productId : number) : Promise<Product> {
        const product = await prismaClient.product.findFirst({
            where: {
                id: productId,
            }
        })

        if(!product) {
            throw new ResponseError(404, "Product not found")
        }

        return product
    }

    static async update(user: User, request: UpdateProductRequest): Promise<ProductResponse> {
        const updateRequest = Validation.validate(ProductValidation.UPDATE, request);

        if (!updateRequest.id) {
            throw new ResponseError(400, "Invalid product ID");
        }
    
        await this.checkProductMustExists(user.email, updateRequest.id);
    
        const product = await prismaClient.product.update({
            where: {
                id: updateRequest.id,
            },
            data: updateRequest
        });
    
        return toProductResponse(product);
    }
    
    static async get(productId: number): Promise<ProductResponse | null> {
        const product = await prismaClient.product.findUnique({
            where: {
                id: productId
            },
            include: {
                category: true
            }
        });
        if (!product) {
            return null;
        }
    
        return toProductResponse(product);
    }
    

    static async getAll(): Promise<ProductResponse[]> {
        const products = await prismaClient.product.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        category_name: true,
                        
                    }
                }
            }
        });
        const reversedProducts = products.reverse();
        const productResponses = reversedProducts.map(product => toProductResponse(product)).reverse();
        console.log('productResponses', productResponses);
        return productResponses;
    }
    
    

    static async delete(user: User, id: number) : Promise<ProductResponse> {
        await this.checkProductMustExists(user.email, id);

        const product = await prismaClient.product.delete({
            where: {
                id: id,
            }
        });

        return toProductResponse(product);
    }

    static async search(request: SearchProductRequest): Promise<{ products: ProductResponse[]; total: number }> {
    const filters: any = {
        OR: [
            {
                product_name: {
                    contains: request.product_name,
                    mode: 'insensitive',
                },
            },
            {
                description: {
                    contains: request.description,
                    mode: 'insensitive',
                },
            },
            {
                category: {
                    category_name: {
                        contains: request.category?.category_name,
                        mode: 'insensitive',
                    },
                },
            },
        ],
    };

    if (request.min_price !== undefined) {
        filters.price = {
            gte: request.min_price,
        };
    }

    if (request.max_price !== undefined) {
        filters.price = {
            lte: request.max_price,
        };
    }

    const sort: any = {};
    if (request.sort === 'price_asc') {
        sort.price = 'asc';
    } else if (request.sort === 'price_desc') {
        sort.price = 'desc';
    }

    const page = request.page || 1;
    const limit = request.limit || 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        prismaClient.product.findMany({
            where: filters,
            include: {
                category: true,
            },
            orderBy: sort,
            skip,
            take: limit,
        }),
        prismaClient.product.count({
            where: filters,
        }),
    ]);

    const productResponses = products.map(product => toProductResponse(product));

    return { products: productResponses, total };
}

    
    static async getSimilarProducts(productId: number): Promise<ProductResponse[]> {
        const product = await prismaClient.product.findUnique({
            where: {
                id: productId
            },
            include: {
                category: true
            }
        })

        if (!product) {
            throw new ResponseError(404, "Product not found");
        }
        
        const similarProducts = await prismaClient.product.findMany({
            where: {
                category_id: product.category_id,
                id: {
                    not: productId
                },
            },
            include: {
                category: true
            },
            take: 5
        });
    
        const productResponses = similarProducts.map(product => toProductResponse(product));
    
        return productResponses;
    }
    
    static async getBestProducts(limit: number = 10) : Promise<ProductResponse[]> {
        const products = await prismaClient.product.findMany({
            where: {
                sales: {
                    gt: 0
                }
            },
            orderBy: {
                sales: 'desc'
            },
            take: limit,
            include: {
                category: true
            }
        });

        return products.map(product => toProductResponse(product));
    }

    static async getRecommendedProducts(limit: number = 10) : Promise<ProductResponse[]> {
        const products = await prismaClient.product.findMany({
            where: {
                rating: {
                    gt: 0
                }
            },
            orderBy: {
                rating: 'desc'
            },
            take: limit,
            include: {
                category: true
            }
        });

        return products.map(product => toProductResponse(product));
    }
}
