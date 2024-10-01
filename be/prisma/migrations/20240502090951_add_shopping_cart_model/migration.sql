-- AlterTable
ALTER TABLE "users" ALTER COLUMN "token" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "shopping_carts" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoppingCartItems" (
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "shoppingCartId" INTEGER NOT NULL,

    CONSTRAINT "shoppingCartItems_pkey" PRIMARY KEY ("productId","shoppingCartId")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopping_carts_user_email_key" ON "shopping_carts"("user_email");

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoppingCartItems" ADD CONSTRAINT "shoppingCartItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoppingCartItems" ADD CONSTRAINT "shoppingCartItems_shoppingCartId_fkey" FOREIGN KEY ("shoppingCartId") REFERENCES "shopping_carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
