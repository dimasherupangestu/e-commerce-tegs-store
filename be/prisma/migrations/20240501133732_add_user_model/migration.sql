-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100),
    "full_name" VARCHAR(100),
    "password" VARCHAR(100) NOT NULL,
    "phone_number" INTEGER,
    "photo_profile" VARCHAR(100),
    "street" VARCHAR(100),
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "country" VARCHAR(100),
    "postal_code" VARCHAR(100),
    "token" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);
