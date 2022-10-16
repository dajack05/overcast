import {PrismaClient} from "@prisma/client"

export async function CheckUser(email:string, password:string):Promise<boolean>{
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
        where:{
            email,
        }
    });

    console.log(user);

    await prisma.$disconnect();

    return true;
}