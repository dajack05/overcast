import { PrismaClient } from "@prisma/client";
import { ReturnType } from "@/src/ReturnType";
import { UserDataSource } from "~~/server/src/User";
import prisma from "~~/server/src/Prisma";

export default defineEventHandler(async (evt): Promise<ReturnType> => {
  const id = evt.context.auth.id;

  if(id == undefined){
    return{
      error:"Missing Token",
    };
  }

  const user = await prisma.user.findUnique({ where: { id } });

  const safe_user = UserDataSource.UserAsUserInfo(user);

  return {
    response: safe_user,
  };
});
