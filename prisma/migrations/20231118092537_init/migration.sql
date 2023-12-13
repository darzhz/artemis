-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "contact" INTEGER,
    "passwordHash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "faculty_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT,
    "contact" INTEGER,
    "department_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "user_id" INTEGER NOT NULL,
    "dept" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "rollnum" INTEGER NOT NULL,
    "admNum" INTEGER NOT NULL,
    "pfp" TEXT NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "academicInfo" JSONB NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "department" (
    "deptid" SERIAL NOT NULL,
    "dept_name" TEXT NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("deptid")
);

-- CreateTable
CREATE TABLE "subjects" (
    "sub_code" TEXT NOT NULL,
    "sub_name" TEXT NOT NULL,
    "faculty_code" TEXT NOT NULL,
    "deptid" INTEGER NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("sub_code")
);

-- CreateTable
CREATE TABLE "attendence" (
    "user_id" INTEGER NOT NULL,
    "sub_code" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "absent" JSONB NOT NULL,
    "dutyLeave" JSONB NOT NULL,

    CONSTRAINT "attendence_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_id_key" ON "Users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_role_key" ON "Users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- CreateIndex
CREATE UNIQUE INDEX "department_deptid_key" ON "department"("deptid");

-- CreateIndex
CREATE UNIQUE INDEX "department_dept_name_key" ON "department"("dept_name");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_sub_code_key" ON "subjects"("sub_code");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_faculty_code_key" ON "subjects"("faculty_code");

-- CreateIndex
CREATE UNIQUE INDEX "attendence_sub_code_key" ON "attendence"("sub_code");

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("deptid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_dept_fkey" FOREIGN KEY ("dept") REFERENCES "department"("dept_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_deptid_fkey" FOREIGN KEY ("deptid") REFERENCES "department"("deptid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendence" ADD CONSTRAINT "attendence_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendence" ADD CONSTRAINT "attendence_sub_code_fkey" FOREIGN KEY ("sub_code") REFERENCES "subjects"("sub_code") ON DELETE RESTRICT ON UPDATE CASCADE;
