import express from "express";
import { UserController } from "../controller/user-controller";
import { ProductController } from "../controller/product-controller";
import { AuthController } from "../controller/authController";
import { CategoryController } from "../controller/category-controller";
import { TransactionController } from "../controller/transaction-controller";

export const publicRouter = express.Router();

// GOOGLE Login
publicRouter.get("/auth/google", AuthController.googleAuth);
// GOOGLE Callback
publicRouter.get("/auth/google/callback", AuthController.googleCallback);

// Request Verification
publicRouter.post("/api/request-verification", AuthController.requestVerification);
// Verify Code Mail
publicRouter.post("/api/verify-email", AuthController.verifyEmail);

publicRouter.post("/api/users/verify-email", UserController.verifyEmail);
publicRouter.post("/api/users/register", UserController.register);
publicRouter.post("/api/users/login", UserController.login);


// Product API
publicRouter.get("/api/product-detail/:productId(\\d+)", ProductController.get);
publicRouter.get("/api/products", ProductController.getAll);
publicRouter.get("/api/search-products", ProductController.search);
publicRouter.get("/api/products/:productId(\\d+)/similar", ProductController.getSimilarProducts)
publicRouter.get("/api/best-products", ProductController.getBestProducts);
publicRouter.get("/api/recommended-products", ProductController.getRecommendedProducts);

publicRouter.post("/api/transaction/notification", TransactionController.trxNotif)

// Category API
publicRouter.get("/api/categories/:categoryName", CategoryController.get)
