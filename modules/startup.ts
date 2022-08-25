import { Nuxt } from "@nuxt/schema";

export default async (inlineOptions: any, nuxt: Nuxt) => {
  nuxt.hook("run:before", async () => {
    console.log("Isn't this magical");
  });
  nuxt.hook("ready", async (nuxt) => {
    console.log("Nuxt is ready");
  });
};
