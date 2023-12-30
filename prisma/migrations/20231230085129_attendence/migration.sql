/*
  Warnings:

  - Changed the type of `absent` on the `attendence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dutyLeave` on the `attendence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "attendence" DROP COLUMN "absent",
ADD COLUMN     "absent" INTEGER NOT NULL,
DROP COLUMN "dutyLeave",
ADD COLUMN     "dutyLeave" INTEGER NOT NULL;
