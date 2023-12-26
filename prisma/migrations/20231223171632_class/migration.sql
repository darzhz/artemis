-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "className" TEXT;

-- CreateTable
CREATE TABLE "Class" (
    "class_id" SERIAL NOT NULL,
    "class_name" TEXT NOT NULL,
    "dept" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "_ClassToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassTosubjects" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_class_name_key" ON "Class"("class_name");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToStudent_AB_unique" ON "_ClassToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToStudent_B_index" ON "_ClassToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassTosubjects_AB_unique" ON "_ClassTosubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassTosubjects_B_index" ON "_ClassTosubjects"("B");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_dept_fkey" FOREIGN KEY ("dept") REFERENCES "department"("dept_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStudent" ADD CONSTRAINT "_ClassToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStudent" ADD CONSTRAINT "_ClassToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassTosubjects" ADD CONSTRAINT "_ClassTosubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassTosubjects" ADD CONSTRAINT "_ClassTosubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "subjects"("sub_code") ON DELETE CASCADE ON UPDATE CASCADE;
