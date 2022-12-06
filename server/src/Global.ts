import { PrismaClient } from ".prisma/client";
import { config } from 'dotenv';

export const prisma = new PrismaClient();

export function wait_ms(ms: number): Promise<void> {
  const p = new Promise<void>((resolve) => {
    setInterval(() => {
      resolve();
    }, ms);
  });

  return p;
}

export function IsDev():boolean{
  if(process.env.IS_DEV == undefined){
    config();
  }

  return process.env.IS_DEV === "1";
}