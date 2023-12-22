/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `Student` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_user_id_fkey";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "student_id" INTEGER NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
