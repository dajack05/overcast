import { Users } from "@prisma/client";
import { prisma } from "./Global";

export class User {
  static async Create(
    email: string,
    dob: string,
    password: string,
    first_name: string,
    last_name: string
  ): Promise<string | undefined> {
    try {
      await prisma.users.create({
        data: {
          email,
          dob,
          password,
          first_name,
          last_name,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

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
