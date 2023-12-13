import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
exports.RegisterNewUser = async(name,role,email) => {
    const user = prisma.users.create({
        data:{
            name:name,
            role:role,
            email:email,
            address: null,
            number:null,
            passwordHash:'qwertyui1234567',
            created_at:'163473847783'
        }
    })
}