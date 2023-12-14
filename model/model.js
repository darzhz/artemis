const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.RegisterNewUser = async (name, role, email) => {
    try {
        const user = await prisma.users.create({
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
        return {
            success: true,
            message: 'User successfully registered.',
            user: user
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