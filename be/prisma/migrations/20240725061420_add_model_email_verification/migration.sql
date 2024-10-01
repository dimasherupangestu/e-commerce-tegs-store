/*
  Warnings:

  - A unique constraint covering the columns `[emailVerificationId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerificationId" INTEGER,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "email_verification" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "email_verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_email_key" ON "email_verification"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailVerificationId_key" ON "users"("emailVerificationId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_emailVerificationId_fkey" FOREIGN KEY ("emailVerificationId") REFERENCES "email_verification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
