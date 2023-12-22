const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.RegisterNewUser = async (data) => {
    const { name, role, email } = data;
    console.log(name,role,email)
    try {
        // Check if user with the same email already exists
        const existingUser = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return {
                success: false,
                message: 'User with this email already exists.',
                user: existingUser
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
                passwordHash: '123456',
                created_at: new Date().toISOString()
            }
        });

        // User successfully created
        if(role == "student"){
           const { department, semester, dob, rollnum, admNum, cgpa } = data;
           const dept = await prisma.department.findUnique({
            where: {
                dept_name:department
            }
           })
           const newStudent = await prisma.student.create({
            //TODO : implement cleanup if this fails
            data: {
                semester:parseInt(semester),
                dob:new Date(dob),
                admNum:parseInt(admNum),
                rollnum:parseInt(rollnum),
                pfp:'',
                cgpa:parseFloat(cgpa),
                academicInfo:{},
                user:{
                    connect: {
                    user_id : newUser.user_id,
                    },
                },
                department:{
                    connect : {
                        dept_name:dept.dept_name,
                    },
                },
            },
           });
        }else if(role == "faculty"){
            const newFaculty = await prisma.faculty.create({
                data:{
                    name:name,
                    role:"asst prof",
                    email:email,
                    contact
                }
            })
        }
        return {
            success: true,
            message: 'User successfully registered.',
            user: newUser
        };
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        return {
            success: false,
            message: 'Error registering user. Please try again later.'
        };
    } finally {
        await prisma.$disconnect(); // Close Prisma client connection
    }
};
exports.searchByType = async (type) =>{
    const users = await prisma.users.findMany({
        where:{
            role:type
        }
    });
    console.log(users)
    return users;
}