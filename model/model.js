const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.RegisterNewUser = async (data) => {
  const { name, role, email } = data;
  console.log(name, role, email);
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
        address: null,
        contact: null,
        passwordHash: "123456",
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
    } else if (role == "faculty") {
      const { department, Frole } = data;
      const dept = await prisma.department.findUnique({
        where: {
          dept_name: department,
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
  const { day, period, className, facultyId, sub_code, departmentName } = data;

  try {
    const timetableEntry = await prisma.timetable.create({
      data: {
        day,
        period,
        sub_code: sub_code,
        lecturer: {
          connect: { user_id: facultyId }, // Connect the facultyId to the user_id in Users model
        },
        department: {
          connect: { dept_name: departmentName },
        },
        class: {
          connect: { class_name: className },
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
