import { COOKIE_NAME } from "~~/Globals";
import { UserInfo } from "~~/server/src/User";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: undefined,
    token: useCookie(COOKIE_NAME).value,
  }),

  actions: {
    async fetchUser():Promise<string|undefined>{
        if(!this.token){
            return "Missing Token";
        }

        const user = await $fetch('/api/user/me',{
            method:"POST",
            headers:{
                authentication:this.token,
            }
        });

        if(user.error){
            return user.error;
        }

        console.log(user.response);
        this.user = user.response as UserInfo;
    },

    async login(email: string, password: string): Promise<string | undefined> {
      const result = await $fetch("/api/login", {
        method: "POST",
        body: { email, password },
      });
      if (result.error) {
        return result.error;
      }

      this.token = useCookie(COOKIE_NAME).value;

      return;
    },

    logout(){
        this.user = undefined;
        this.token = undefined;
        useCookie(COOKIE_NAME).value = undefined;
    },
  },
});
