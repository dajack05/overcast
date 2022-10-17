import { PrismaClient } from ".prisma/client";

export const prisma = new PrismaClient();

export function wait_ms(ms: number): Promise<void> {
  const p = new Promise<void>((resolve) => {
    setInterval(() => {
      resolve();
    }, ms);
  });

  return p;
}
