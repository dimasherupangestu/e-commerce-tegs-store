/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sales" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ALTER COLUMN "password" SET NOT NULL;
