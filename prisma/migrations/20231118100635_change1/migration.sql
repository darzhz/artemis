/*
  Warnings:

  - You are about to drop the column `department_id` on the `Faculty` table. All the data in the column will be lost.
  - Added the required column `dept_name` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_department_id_fkey";

-- DropIndex
DROP INDEX "Users_role_key";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "department_id",
ADD COLUMN     "dept_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_dept_name_fkey" FOREIGN KEY ("dept_name") REFERENCES "department"("dept_name") ON DELETE RESTRICT ON UPDATE CASCADE;
