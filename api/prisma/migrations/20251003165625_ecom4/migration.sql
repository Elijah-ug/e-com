/*
  Warnings:

  - A unique constraint covering the columns `[buyerId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_buyerId_productId_key" ON "public"."CartItem"("buyerId", "productId");
