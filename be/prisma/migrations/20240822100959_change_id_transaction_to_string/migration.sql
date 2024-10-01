/*
  Warnings:

  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `transactionsitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactionsitem" DROP CONSTRAINT "transactionsitem_productId_fkey";

-- DropForeignKey
ALTER TABLE "transactionsitem" DROP CONSTRAINT "transactionsitem_transactionId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(110),
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "transactions_id_seq";

-- DropTable
DROP TABLE "transactionsitem";

-- CreateTable
CREATE TABLE "transactions_item" (
    "id" VARCHAR(110) NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createad_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "transaction_id" VARCHAR(110) NOT NULL,

    CONSTRAINT "transactions_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_item" ADD CONSTRAINT "transactions_item_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
