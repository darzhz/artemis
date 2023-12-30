/*
  Warnings:

  - The primary key for the `attendence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id,sub_code,time]` on the table `attendence` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "attendence_sub_code_key";

-- AlterTable
ALTER TABLE "attendence" DROP CONSTRAINT "attendence_pkey",
ADD COLUMN     "attendenceMark" SERIAL NOT NULL,
ADD CONSTRAINT "attendence_pkey" PRIMARY KEY ("attendenceMark");

-- CreateIndex
CREATE UNIQUE INDEX "attendence_user_id_sub_code_time_key" ON "attendence"("user_id", "sub_code", "time");
