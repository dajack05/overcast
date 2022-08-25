import { ReturnType } from "@/src/ReturnType";
import { UserDataSource } from "~~/server/src/User";
import prisma from "~~/server/src/Prisma";

export default defineEventHandler(async (evt): Promise<ReturnType> => {
  console.log("Got Here!");
  if (evt.context.auth.id === undefined) {
    if (evt.context.error) {
      return {
        error: evt.context.error,
      };
    }

    return {
      error: "Missing Token",
    };
  }

  const id = evt.context.auth.id;
  const user = await prisma.user.findUnique({ where: { id } });
  const safe_user = UserDataSource.UserAsUserInfo(user);

  return {
    response: safe_user,
  };
});
