import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import upload from "../middleware/upload-file";
import { ProductController } from "../controller/product-controller";
import { ShoppingCartController } from "../controller/shopping-cart-controller";
import { RajaOngkirController } from "../controller/delivery-controller";
import { TransactionController } from "../controller/transaction-controller";
// import { TransactionController } from "../controller/transaction-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware)

// User API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", upload.single("photo_profile"), UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

// Product API
apiRouter.post("/api/products", upload.array("image" ), ProductController.create)
apiRouter.put("/api/products/:productId(\\d+)", ProductController.update);
apiRouter.delete("/api/products/:productId(\\d+)", ProductController.delete);

// Shopping Cart API
apiRouter.post("/api/shopping-cart", ShoppingCartController.addToCart)
apiRouter.get("/api/shopping-cart", ShoppingCartController.get)
apiRouter.put("/api/shopping-cart", ShoppingCartController.updateCartItem)
apiRouter.delete("/api/shopping-cart", ShoppingCartController.removeItemFromCart)   

// Transaction API
apiRouter.post("/api/transaction", TransactionController.createTransaction)
apiRouter.get("/api/transaction/:transaction_id", TransactionController.getTransactionById)
apiRouter.get("/api/transaction", TransactionController.getAllTransaction)

// Raja Ongkir
apiRouter.post("/api/raja-ongkir/cost", RajaOngkirController.calculateShippingCost)