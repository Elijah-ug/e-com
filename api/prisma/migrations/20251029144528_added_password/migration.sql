-- AlterTable
ALTER TABLE "public"."Buyer" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."Seller" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'pending';
