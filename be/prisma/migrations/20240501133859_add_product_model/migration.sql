-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT[],
    "size" TEXT[],
    "image" TEXT[],
    "rating" INTEGER NOT NULL,
    "sales" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
