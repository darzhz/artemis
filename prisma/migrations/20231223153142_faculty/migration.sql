/*
  Warnings:

  - Added the required column `created_at` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
