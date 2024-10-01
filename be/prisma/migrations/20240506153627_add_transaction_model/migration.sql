-- CreateEnum
CREATE TYPE "transactions_status" AS ENUM ('PENDING_PAYMENT', 'PAID', 'CANCELED');

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "status" "transactions_status" NOT NULL,
    "customer_name" VARCHAR(255) NOT NULL,
    "customer_email" VARCHAR(255) NOT NULL,
    "snap_token" VARCHAR(255),
    "snap_redirect_url" VARCHAR(255),
    "payment_method" VARCHAR(110),
    "createad_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactionsitem" (
    "product_name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createad_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "transactionsitem_pkey" PRIMARY KEY ("productId","transactionId")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionsitem" ADD CONSTRAINT "transactionsitem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionsitem" ADD CONSTRAINT "transactionsitem_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
