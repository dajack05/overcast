import { Nuxt } from "@nuxt/schema";
import cron from 'node-cron';

export default async (inlineOptions: any, nuxt: Nuxt) => {
  nuxt.hook("ready", async (nuxt) => {
    cron.schedule("0,10,20,30,40,50 * * * * *", (now)=>{
      console.log(`${now.toLocaleTimeString()}: Hellos From Cron`);
    });
  });
};
