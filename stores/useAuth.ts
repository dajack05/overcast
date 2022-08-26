import { COOKIE_NAME } from "~~/Globals";
import { UserInfo } from "~~/server/src/User";

interface AuthState {
  token: string;
  user: UserInfo | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: useCookie(COOKIE_NAME).value,
    user: null,
  }),

  actions: {
    async login(email: string, password: string): Promise<string | null> {
      const result = await $fetch("/api/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      if (result.error) {
        console.error(result.error);
        return result.error;
      }

      const cookie = useCookie(COOKIE_NAME);
      this.token = cookie.value;

      return null;
    },

    async logout(){
      const cookie = useCookie(COOKIE_NAME);
      cookie.value = undefined;
      this.token = "";
      this.user = null;
      useRouter().push('/auth');
    },

    async loadUser(): Promise<string | null> {

      console.log(`Loading user with token "${this.token}"`);

      const value = await $fetch("/api/user/me", {
        method: "POST",
        headers: {
          authentication: this.token,
        },
      });

      if (value.error) {
        console.error(value.error);
        this.user = null;
        useCookie(COOKIE_NAME).value = undefined;
        return value.error;
      }

      this.user = value.response as UserInfo;
      return null;
    },
  },

  getters: {
    getUser(state) {
      if (state.user) {
        return state.user;
      }

      this.loadUser();
      return state.user;
    },
  },
});
