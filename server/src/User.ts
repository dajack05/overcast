import { Users } from "@prisma/client";
import { prisma } from "./Global";

export class User {
  static async Update(updatedUser: Users) {
    try {
      await prisma.users.update({
        where: { id: updatedUser.id },
        data: updatedUser,
      });
    } catch (err) {
      console.error(err);
    }
  }

  static async GetByEmail(email: string): Promise<Users | null> {
    try {
      const user = await prisma.users.findFirst({ where: { email } });
      await prisma.$disconnect();
      return user;
    } catch (err) {
      console.error(err);
    }

    return null;
  }
}

export async function CheckUser(
  email: string,
  password: string
): Promise<boolean> {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  console.log(user);

  return true;
}
