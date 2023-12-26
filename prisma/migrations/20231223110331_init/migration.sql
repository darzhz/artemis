/*
  Warnings:

  - You are about to drop the column `contact` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Faculty` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Faculty` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Faculty_email_key";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "contact",
DROP COLUMN "email",
DROP COLUMN "name";
