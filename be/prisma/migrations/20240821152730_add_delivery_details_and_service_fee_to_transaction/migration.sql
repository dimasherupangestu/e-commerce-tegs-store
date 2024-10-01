/*
  Warnings:

  - Added the required column `service_fee` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "delivery_details" JSONB,
ADD COLUMN     "service_fee" INTEGER NOT NULL;
