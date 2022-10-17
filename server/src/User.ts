import { Prisma, PrismaClient, Users } from "@prisma/client";

export class User {
  static async GetByEmail(email: string): Promise<Users | null> {
    const prisma = new PrismaClient();

    try {
      const user = await prisma.users.findFirst({ where: { email } });
      await prisma.$disconnect();
      return user;
    } catch (err) {
      console.error(err);
    }

    await prisma.$disconnect();
    return null;
  }
}

export async function CheckUser(
  email: string,
  password: string
): Promise<boolean> {
  const prisma = new PrismaClient();

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  console.log(user);

  await prisma.$disconnect();

  return true;
}
