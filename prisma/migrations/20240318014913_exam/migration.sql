-- AlterTable
ALTER TABLE "examType" ADD COLUMN     "faculty_id" INTEGER NOT NULL DEFAULT 63;

-- AddForeignKey
ALTER TABLE "examType" ADD CONSTRAINT "examType_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("faculty_id") ON DELETE RESTRICT ON UPDATE CASCADE;
