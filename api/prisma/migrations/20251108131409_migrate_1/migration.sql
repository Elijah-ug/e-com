-- AlterTable
ALTER TABLE "public"."Buyer" ADD COLUMN     "balance" INTEGER;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "isBought" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOrdered" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Seller" ADD COLUMN     "balance" INTEGER;
