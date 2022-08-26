import { UserInfo } from "~~/server/src/User";

interface AuthState {
  token: string;
  user: UserInfo | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: "",
    user: null,
  }),

  actions: {
    async loadUser(){
      const value = $fetch('/api/user/me',{
        me
      })
    }
  },

  getters: {
    async getUser(state) {
      if (state.user) {
        return state.user;
      }

      const value = await fetch("/api/user/me", {
        method: "POST",
        headers: {
          authentication: state.token,
        },
      });

      console.log(value);
    },
  },
});
