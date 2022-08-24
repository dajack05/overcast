import { PrismaClient } from "@prisma/client";
import { ReturnType } from "@/src/ReturnType";
import { UserDataSource } from "~~/server/src/User";

export default defineEventHandler(async (evt): Promise<ReturnType> => {
  const id = evt.context.auth.id;

  const client = new PrismaClient();

  const user = await client.user.findUnique({ where: { id } });

  await client.$disconnect();

  const safe_user = UserDataSource.UserAsUserInfo(user);

  return {
    response: safe_user,
  };
});
