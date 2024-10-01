import { ShoppingCartItem, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  CartProduct,
  CreateShoppingCartRequest,
  ShoppingCartItemResponse,
  ShoppingCartResponse,
  ShoppingCartResponseItem,
  toShoppingCartItemResponse,
  toShoppingCartResponse,
  UpdatedCartItemResponse,
  UpdateShoppingCartRequest,
} from "../model/shopping-cart-model";
import { Validation } from "../validation/validation";
import { ShoppingCartValidation } from "../validation/shopping-cart-validation";
import { ResponseError } from "../error/response.error";

export class ShoppingCartService {
  static async addToCart(
    user: User,
    request: CreateShoppingCartRequest
  ): Promise<ShoppingCartResponse> {
    const addToCartRequest = Validation.validate(
      ShoppingCartValidation.ADD_TO_CART,
      request
    );
  
    let shoppingCart = await prismaClient.shoppingCart.findUnique({
      where: {
        user_email: user.email,
      },
    });
  
    if (!shoppingCart) {
      shoppingCart = await prismaClient.shoppingCart.create({
        data: {
          user: {
            connect: {
              email: user.email,
            },
          },
          quantity: 0,
          total: 0,
        },
      });
    }
  
    const product = await prismaClient.product.findUnique({
      where: {
        id: addToCartRequest.product_id,
      },
    });
  
    if (!product) {
      throw new Error("Product not found");
    }
  
    let shoppingCartItem: ShoppingCartItem | null = null;
  
    const existingItem = await prismaClient.shoppingCartItem.findFirst({
      where: {
        productId: product.id,
        shoppingCartId: shoppingCart.id,
      },
    });
  
    if (existingItem) {
      shoppingCartItem = await prismaClient.shoppingCartItem.update({
        where: {
          productId_shoppingCartId: {
            productId: product.id,
            shoppingCartId: shoppingCart.id,
          },
        },
        data: {
          quantity: {
            increment: addToCartRequest.quantity,
          },
          total: {
            increment: product.price * addToCartRequest.quantity,
          },
          selectedSize: addToCartRequest.selectedSize,
          selectedColor: addToCartRequest.selectedColor,
        },
      });
    } else {
      shoppingCartItem = await prismaClient.shoppingCartItem.create({
        data: {
          quantity: addToCartRequest.quantity,
          total: product.price * addToCartRequest.quantity,
          selectedSize: addToCartRequest.selectedSize,
          selectedColor: addToCartRequest.selectedColor,
          product: {
            connect: { id: product.id },
          },
          shoppingCart: {
            connect: { id: shoppingCart.id },
          },
        },
      });
    }
  
    await prismaClient.shoppingCart.update({
      where: {
        id: shoppingCart.id,
      },
      data: {
        quantity: {
          increment: addToCartRequest.quantity,
        },
        total: {
          increment: product.price * addToCartRequest.quantity,
        },
      },
    });
  
    if (!shoppingCartItem) {
      throw new Error("Failed to retrieve shopping cart item");
    }
  
    return toShoppingCartResponse(shoppingCart, shoppingCartItem);
  }
  


  static async get(user: User): Promise<ShoppingCartResponseItem> {
    const shoppingCartItems = await prismaClient.shoppingCartItem.findMany({
      where: {
        shoppingCart: {
          user_email: user.email,
        },
      },
      include: {
        product: true,
      },
    });

    const productsMap: { [key: number]: CartProduct } = {};

    shoppingCartItems.forEach((item) => {
      if (!productsMap[item.productId]) {
        productsMap[item.productId] = {
          products: item.product,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: 0,
          sub_total: 0,
        };
      }
      productsMap[item.productId].quantity += item.quantity;
      productsMap[item.productId].sub_total += item.total;
    });

    const productsArray = Object.values(productsMap);
    const total = productsArray.reduce(
      (acc, product) => acc + product.sub_total,
      0
    );

    const response: ShoppingCartResponseItem = {
      user_email: user.email,
      products: productsArray,
      total,
    };

    return response;
}


  static async updateCartItem(
  user: User,
  request: UpdateShoppingCartRequest
): Promise<UpdatedCartItemResponse> {
  if (request.newQuantity < 0) {
    throw new ResponseError(400, "Quantity must be greater than 0");
  }

  const shoppingCart = await prismaClient.shoppingCart.findUnique({
    where: {
      user_email: user.email,
    },
  });

  if (!shoppingCart) {
    throw new ResponseError(400, "Shopping cart not found");
  }

  const item = await prismaClient.shoppingCartItem.findUnique({
    where: {
      productId_shoppingCartId: {
        productId: request.product_id,
        shoppingCartId: shoppingCart.id,
      },
    },
  });

  if (!item) {
    throw new ResponseError(400, "Item not found");
  }

  const product = await prismaClient.product.findUnique({
    where: {
      id: request.product_id,
    },
  });

  if (!product) {
    throw new ResponseError(400, "Product not found");
  }

  const oldQuantity = item.quantity;
  const quantityChange = request.newQuantity - oldQuantity;
  const newSubTotal = product.price * request.newQuantity;

  await prismaClient.shoppingCartItem.update({
    where: {
      productId_shoppingCartId: {
        productId: request.product_id,
        shoppingCartId: shoppingCart.id,
      },
    },
    data: {
      quantity: request.newQuantity,
      total: newSubTotal,
      selectedSize: request.selectedSize || item.selectedSize, 
      selectedColor: request.selectedColor || item.selectedColor,
    },
  });

  await prismaClient.shoppingCart.update({
    where: {
      id: shoppingCart.id,
    },
    data: {
      total: {
        increment: newSubTotal - item.total,
      },
      quantity: {
        increment: quantityChange,
      },
    },
  });

  const updatedCart = await prismaClient.shoppingCart.findUnique({
    where: {
      id: shoppingCart.id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  const total =
    updatedCart?.products?.reduce((acc, item) => acc + item.total, 0) ?? 0;

  return {
    product_id: request.product_id,
    quantity: request.newQuantity,
    sub_total: newSubTotal,
    total: total,
    user_email: user.email,
    selectedSize: request.selectedSize || item.selectedSize,
    selectedColor: request.selectedColor || item.selectedColor,
  };
  }

  static async removeItemFromCart(user: User, productId: number): Promise<void> {
    const shoppingCart = await prismaClient.shoppingCart.findUnique({
        where: {
            user_email: user.email,
        },
    });

    if (!shoppingCart) {
        throw new ResponseError(400, "Shopping cart not found");
    }

    const item = await prismaClient.shoppingCartItem.findUnique({
        where: {
            productId_shoppingCartId: {
                productId,
                shoppingCartId: shoppingCart.id,
            },
        },
    });

    if (!item) {
        throw new ResponseError(400, "Item not found");
    }

    await prismaClient.shoppingCartItem.delete({
        where: {
            productId_shoppingCartId: {
                productId,
                shoppingCartId: shoppingCart.id,
            },
        },
    });

    await prismaClient.shoppingCart.update({
        where: {
            id: shoppingCart.id,
        },
        data: {
            total: {
                decrement: item.total,
            },
            quantity: {
                decrement: item.quantity,
            },
        },
    });
  }

  static async deleteAll(user: User): Promise<void> {
    const shoppingCart = await prismaClient.shoppingCart.findUnique({
      where: {
        user_email: user.email,
      },
    });

    if (!shoppingCart) {
      throw new ResponseError(400, "Shopping cart not found");
    }

    await prismaClient.shoppingCartItem.deleteMany({
      where: {
        shoppingCartId: shoppingCart.id,
      },
    });

    await prismaClient.shoppingCart.update({
      where: {
        id: shoppingCart.id,
      },
      data: {
        quantity: 0,
        total: 0,
      },
    });
  }
}
