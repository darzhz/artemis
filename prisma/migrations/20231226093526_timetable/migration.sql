-- CreateTable
CREATE TABLE "Timetable" (
    "timetable_id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "class_name" TEXT NOT NULL,
    "faculty_id" INTEGER NOT NULL,
    "dept_name" TEXT NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("timetable_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timetable_day_period_class_name_key" ON "Timetable"("day", "period", "class_name");

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_dept_name_fkey" FOREIGN KEY ("dept_name") REFERENCES "department"("dept_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_class_name_fkey" FOREIGN KEY ("class_name") REFERENCES "Class"("class_name") ON DELETE RESTRICT ON UPDATE CASCADE;
