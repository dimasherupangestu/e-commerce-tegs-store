/*
  Warnings:

  - Added the required column `weight` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN "weight" INTEGER NOT NULL;
