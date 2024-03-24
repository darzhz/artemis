-- CreateTable
CREATE TABLE "examType" (
    "exam_id" SERIAL NOT NULL,
    "exam_name" TEXT NOT NULL,
    "maxMarks" INTEGER NOT NULL,
    "minMarks" INTEGER NOT NULL,
    "passMarks" INTEGER NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "sub_code" TEXT NOT NULL,
    "deptid" INTEGER NOT NULL,

    CONSTRAINT "examType_pkey" PRIMARY KEY ("exam_id")
);

-- CreateTable
CREATE TABLE "examMarks" (
    "examMarks_id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL,

    CONSTRAINT "examMarks_pkey" PRIMARY KEY ("examMarks_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "examType_exam_name_sub_code_examDate_key" ON "examType"("exam_name", "sub_code", "examDate");

-- CreateIndex
CREATE UNIQUE INDEX "examMarks_exam_id_user_id_key" ON "examMarks"("exam_id", "user_id");

-- AddForeignKey
ALTER TABLE "examType" ADD CONSTRAINT "examType_deptid_fkey" FOREIGN KEY ("deptid") REFERENCES "department"("deptid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examType" ADD CONSTRAINT "examType_sub_code_fkey" FOREIGN KEY ("sub_code") REFERENCES "subjects"("sub_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examMarks" ADD CONSTRAINT "examMarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examMarks" ADD CONSTRAINT "examMarks_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "examType"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;
