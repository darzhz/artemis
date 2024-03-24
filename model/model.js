const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.RegisterNewUser = async (data) => {
  const { name, role, email,address,contactNumber,password } = data;
  console.log(data);
  try {
    // Check if user with the same email already exists
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists.",
        user: existingUser,
      };
    }

    // If user doesn't exist, proceed with insertion
    const newUser = await prisma.users.create({
      data: {
        name: name,
        role: role,
        email: email,
        address: address,
        contact: contactNumber,
        passwordHash: password,
        created_at: new Date().toISOString(),
      },
    });

    // User successfully created
    if (role == "student") {
      console.log(data);
      const { department, semester, dob, rollnum, admNum, cgpa } = data;
      const dept = await prisma.department.findUnique({
        where: {
          dept_name: department,
        },
      });
      const newStudent = await prisma.student.create({
        //TODO : implement cleanup if this fails
        data: {
          semester: parseInt(semester),
          dob: new Date(dob),
          admNum: parseInt(admNum),
          rollnum: parseInt(rollnum),
          pfp: "",
          cgpa: parseFloat(cgpa),
          academicInfo: {},
          user: {
            connect: {
              user_id: newUser.user_id,
            },
          },
          department: {
            connect: {
              dept_name: dept.dept_name,
            },
          },
        },
      });
    } else if (role == "faculty") { //TODO ADD CALUSES FOR HOD AND ADMIN
      const { deptName, Frole } = data;
      debugger;
      const dept = await prisma.department.findUnique({
        where: {
          dept_name: deptName,
        },
      });
      const newFaculty = await prisma.faculty.create({
        data: {
          role: Frole,
          user: {
            connect: {
              user_id: newUser.user_id,
            },
          },
          department: {
            connect: {
              dept_name: dept.dept_name,
            },
          },
        },
      });
    }
    return {
      success: true,
      message: "User successfully registered.",
      user: newUser,
    };
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Error registering user. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
};
exports.searchByType = async (type) => {
  const users = await prisma.users.findMany({
    where: {
      role: type,
    },
  });
  console.log(users);
  return users;
};
exports.insertSubject = async (data) => {
  const { sub_code, sub_name, faculty_code, deptid, subinfo } = data;

  try {
    // Check if the subject with the same sub_code already exists
    const existingSubject = await prisma.subjects.findUnique({
      where: {
        sub_code,
      },
    });

    if (existingSubject) {
      return {
        success: false,
        message: "Subject with this sub_code already exists.",
        subject: existingSubject,
      };
    }

    // If subject doesn't exist, proceed with insertion
    const newSubject = await prisma.subjects.create({
      data: {
        sub_code,
        sub_name,
        faculty_code,
        subinfo,
        department: {
          connect: {
            deptid: deptid,
          },
        },
      },
    });

    return {
      success: true,
      message: "Subject successfully inserted.",
      subject: newSubject,
    };
  } catch (error) {
    console.error("Error inserting subject:", error);
    return {
      success: false,
      message: "Error inserting subject. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
};
exports.getFacultyByFacultyCode = async (facultyCode) => {
  try {
    // Find the faculty member by faculty code
    const faculty = await prisma.faculty.findUnique({
      where: {
        faculty_id: parseInt(facultyCode),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!faculty) {
      return {
        success: false,
        message: "Faculty member not found.",
      };
    }

    return {
      success: true,
      message: "Faculty retrieved successfully.",
      faculty: {
        ...faculty,
        facultyName: faculty.user.name, // Add facultyName to the response
      },
    };
  } catch (error) {
    console.error("Error retrieving faculty by faculty code:", error);
    return {
      success: false,
      message: "Error retrieving faculty. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
};
exports.getSubjectsByFacultyCode = async (facultyCode) => {
  try {
    // Find the faculty member by faculty code
    const subjects = await prisma.subjects.findMany({
      where: {
        faculty_code: facultyCode + "",
      },
    });

    if (!subjects) {
      return {
        success: false,
        message: "Faculty member not found.",
      };
    }
    return {
      success: true,
      message: "Subjects retrieved successfully.",
      subjects: subjects,
    };
  } catch (error) {
    console.error("Error retrieving subjects by faculty code:", error);
    return {
      success: false,
      message: "Error retrieving subjects. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
};
exports.getSubjectsBySubCode = async (subcode) => {
  try {
    // Find the faculty member by faculty code
    const subjects = await prisma.subjects.findUnique({
      where: {
        sub_code:subcode,
      },
    });

    if (!subjects) {
      return {
        success: false,
        message: "subject  not found.",
      };
    }
    return {
      success: true,
      message: "Subjects retrieved successfully.",
      subjects: subjects,
    };
  } catch (error) {
    console.error("Error retrieving subjects by faculty code:", error);
    return {
      success: false,
      message: "Error retrieving subjects. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
};
exports.getSubjectsByClassname = async (classname) => {
  try {
    const classWithSubjects = await prisma.class.findMany({
      where: { class_name: classname },
      include: { subjects: true },
    });

    if (!classWithSubjects) {
      return {
        success: false,
        message: "subject  not found.",
      };
    }
    return {
      success: true,
      message: "Subjects retrieved successfully.",
      subjects: classWithSubjects,
    };
  } catch (error) {
    console.error("Error retrieving subjects by faculty code:", error);
    return {
      success: false,
      message: "Error retrieving subjects. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
}
exports.getStudentsByDept = async (departmentName) => {
  try {
    // Find all students in the specified department
    const students = await prisma.student.findMany({
      where: {
        department: {
          dept_name: departmentName,
        },
      },
    });

    return {
      success: true,
      message: "Students retrieved successfully.",
      students: students,
    };
  } catch (error) {
    console.error("Error retrieving students by department:", error);
    return {
      success: false,
      message: "Error retrieving students. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
};

// Function to create a class
exports.createClass = async (data) => {
  const { className, departmentName } = data;
  try {
    const newClass = await prisma.class.create({
      data: {
        class_name: className,
        dept: departmentName,
      },
    });

    return {
      success: true,
      message: "Class created successfully.",
      class: newClass,
    };
  } catch (error) {
    console.error("Error creating class:", error);
    return {
      success: false,
      message: "Error creating class. Please try again later.",
    };
  } finally {
    await prisma.$disconnect();
  }
};
// Function to add students to a class
exports.addStudentsToClass = async (data) => {
  const { classId, studentIds } = data;
  try {
    const updatedClass = await prisma.class.update({
      where: {
        class_id: parseInt(classId),
      },
      data: {
        students: {
          connect: studentIds.map((id) => ({ student_id: id })),
        },
      },
      include: {
        students: true,
      },
    });

    return {
      success: true,
      message: "Students added to the class successfully.",
      class: updatedClass,
    };
  } catch (error) {
    console.error("Error adding students to class:", error);
    return {
      success: false,
      message: "Error adding students to class. Please try again later.",
    };
  } finally {
    await prisma.$disconnect();
  }
};
//function to get students by class
exports.getStudentsByClass = async (classname) =>{
  try {
    const students = await prisma.class.findMany({
      where: {
        class_name: classname.toUpperCase()
      }, include: {
        students:true
      },
    });
    console.log(students)
    return {
      success: true,
      message: "Students retrieved successfully.",
      students: students,
    };
  } catch (error) {
    console.error("Error retrieving students by department:", error);
    return {
      success: false,
      message: "Error retrieving students. Please try again later.",
    };
  } finally {
    await prisma.$disconnect(); // Close Prisma client connection
  }
}

// Function to add subjects to a class
exports.addSubjectsToClass = async (data) => {
  const { classId, subjectCodes } = data;
  try {
    const updatedClass = await prisma.class.update({
      where: {
        class_id: parseInt(classId),
      },
      data: {
        subjects: {
          connect: subjectCodes.map((code) => ({ sub_code: code })),
        },
      },
      include: {
        subjects: true,
      },
    });

    return {
      success: true,
      message: "Subjects added to the class successfully.",
      class: updatedClass,
    };
  } catch (error) {
    console.error("Error adding subjects to class:", error);
    return {
      success: false,
      message: "Error adding subjects to class. Please try again later.",
    };
  } finally {
    await prisma.$disconnect();
  }
};

exports.addTimetableEntry = async (data) => {
  const { day, period, class_name, faculty_id, sub_code, dept_name } = data;

  try {
    const timetableEntry = await prisma.timetable.create({
      data: {
        day,
        period,
        sub_code: sub_code,
        lecturer: {
          connect: { user_id: faculty_id }, // Connect the facultyId to the user_id in Users model
        },
        department: {
          connect: { dept_name: dept_name },
        },
        class: {
          connect: { class_name: class_name },
        },
      },
    });

    return {
      success: true,
      message: "Timetable entry added successfully.",
      timetableEntry,
    };
  } catch (error) {
    console.error("Error adding timetable entry:", error);
    return {
      success: false,
      message: "Error adding timetable entry. Please try again later.",
    };
  } finally {
    await prisma.$disconnect();
  }
};
exports.getTimetableByFacultyId = async (facultyId) => {
  try {
    const timetableEntries = await prisma.timetable.findMany({
      where: {
        faculty_id: parseInt(facultyId),
      },
    });

    return timetableEntries;
  } catch (error) {
    console.error("Error getting timetable by facultyId:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Function to get timetable by className
exports.getTimetableByClassName = async (className) => {
  try {
    const timetableEntries = await prisma.timetable.findMany({
      where: {
        class_name: className,
      },
    });

    return timetableEntries;
  } catch (error) {
    console.error("Error getting timetable by className:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Function to get timetable with filter option for day
exports.getTimetableByDay = async (filterDay) => {
  try {
    const timetableEntries = await prisma.timetable.findMany({
      where: {
        day: filterDay.charAt(0).toUpperCase() + filterDay.slice(1).toLowerCase(),
      },
    });

    return timetableEntries;
  } catch (error) {
    console.error("Error getting timetable by day:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
exports.getBusyHoursForFaculty = async (facultyCode) => {
  try {
    const busyHours = await prisma.timetable.findMany({
      where: {
        faculty_id:parseInt(facultyCode)
      },
      distinct: ['day', 'period']
    });
    const busyHoursByDay = {};
    busyHours.forEach((entry) => {
      const { day, period } = entry;
      if (!busyHoursByDay[day]) {
        busyHoursByDay[day] = [];
      }
      busyHoursByDay[day].push(period);
    });
    return busyHoursByDay;
  } catch (error) {
    console.error('Error getting busy hours for faculty:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

exports.addAttendanceForMultipleUsers = async (attendanceDataArray) => {
  try {
    const attendanceEntries = [];

    for (const attendanceData of attendanceDataArray) {
      console.log(attendanceData);
      const { userId, subCode, time, absent, dutyLeave } = attendanceData;
      //TODO: gracefully handle errors
      const attendanceEntry = await prisma.attendence.create({
        data: {
          user_id: userId,
          sub_code: subCode,
          time: time,
          absent: absent,
          dutyLeave: dutyLeave,
        },
        include: {
          user: true, // Include user information
          subject: true, // Include subject information
        },
      });

      attendanceEntries.push(attendanceEntry);
    }

    return attendanceEntries;
  } catch (error) {
    console.error('Error adding attendance for multiple users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
exports.authenticateUser = async (email, hashedPassword) => {
  try {
    // Find user by email
    const userinfo = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // If user doesn't exist, return invalid email
    if (!userinfo) {
      return { status: 'error', message: 'Invalid email' };
    }

    // Compare hashedPassword with stored passwordHashS
    const passwordMatch = await bcrypt.compare(hashedPassword, userinfo.passwordHash);

    // If passwords match, return user details
    if (passwordMatch) {
      return { status: 'success', user: userinfo }; //FIXME FILTER OUT PASSWORDHASH BEFORE SENDING
    } else {
      return { status: 'error', message: 'Invalid password' };
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return { status: 'error', message: 'Internal server error' };
  }
}
exports.saveTable = async (timetableEntries) => {
  const results = [];

  for (const entry of timetableEntries) {
    const result = await prisma.timetable.create({
      data: entry,
    });
    results.push(result);
  }

  return results;
};
exports.getAllClasses = async () => {
  try {
    const classes = await prisma.class.findMany();
    return classes;
  } catch (error) {
    console.error('Error getting all classes:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
exports.getAllDepartments = async () => {
  try {
    const departments = await prisma.department.findMany();
    return departments;
  } catch (error) {
    console.error('Error getting all departments:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
// Get all exams with status 
exports.getExamsByStatus = async (status) => {
  try {
    const exams = await prisma.examType.findMany({
      where: {
        status: parseInt(status),
      },
    });
    return exams;
  } catch (error) {
    console.error('Error getting exams by status:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
//add exam to the database
/*
model examType {
  exam_id      Int      @id @default(autoincrement())
  exam_name    String
  status       Int        @default(1)
  maxMarks     Int
  minMarks     Int
  passMarks    Int
  examDate     DateTime
  sub_code     String
  deptid       Int
  faculty_id   Int
  faculty      Faculty   @relation(fields: [faculty_id], references: [faculty_id])
  department   department @relation(fields: [deptid], references: [deptid])
  subject      subjects   @relation(fields: [sub_code], references: [sub_code])
  examMarks    examMarks[]
  @@unique([exam_name, sub_code, examDate])
}
// model examMarks {
    //   examMarks_id  Int      @id @default(autoincrement())
    //   exam_id       Int
    //   user_id       Int
    //   marks         Int
    //   user          Users   @relation(fields: [user_id], references: [user_id])
    //   examType      examType @relation(fields: [exam_id], references: [exam_id])
    //   @@unique([exam_id, user_id])
    // } add an option to add marks to the exam by creating a new table with a list of students and their marks using class id*/
exports.addExam = async (examData) => {
  console.log(examData);
  //perform type conversion and validation
  examData.status = parseInt(examData.status);
  examData.examDate = new Date(examData.examDate);
  examData.maxMarks = parseInt(examData.maxMarks);
  examData.minMarks = parseInt(examData.minMarks);
  examData.deptid = parseInt(examData.deptid);
  examData.sub_code = examData.sub_code.toUpperCase();
  examData.exam_name = examData.exam_name.toUpperCase();
  examData.passMarks = parseInt(examData.passMarks);
  try {
    const newExam = await prisma.examType.create({
      data: {
        exam_name: examData.exam_name,
        status: 1,
        maxMarks: examData.maxMarks,
        minMarks: examData.minMarks,
        passMarks: examData.passMarks,
        examDate: examData.examDate,
        classid: examData.classid,
        department: {
          connect: { deptid: examData.deptid },
        },
        subject: {
          connect: { sub_code: examData.sub_code },
        },
        faculty: {
          connect: { faculty_id: examData.faculty_id },
        },
      },
    });
    return newExam;

  } catch (error) {
    console.error('Error adding exam:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

