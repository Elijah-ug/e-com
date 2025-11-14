/*
  Warnings:

  - Added the required column `meta` to the `BuyerNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BuyerNotification" ADD COLUMN     "meta" JSONB NOT NULL;
