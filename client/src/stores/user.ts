import type { Message, User } from "@ovc/common";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const SERVER = import.meta.env.VITE_SERVER_URL;

export const useUserStore = defineStore("user", () => {
  const token = ref("");
  const user = ref<User | undefined>(undefined);

  async function Login(
    email: string,
    password: string
  ): Promise<string | undefined> {
    const response = await axios.post(`${SERVER}/login`, {
      email,
      password,
    });

    // Did we get a token?
    const message = response.data as Message;
    if (message.error) {
      return message.error;
    }

    // We got a token!
    token.value = message.payload as string;

    // Now get the user
    const result = await getUser();
    if(typeof(result) === 'string'){
      console.error(result);
    }

    return;
  }

  function Logout() {
    token.value = "";
    user.value = undefined;
  }

  /**
   * Returns the user or error strings if not logged in
   */
  async function getUser(): Promise<User | string> {
    if (!isLoggedIn()) {
      return "User Not Logged In";
    }

    if (!user.value) {
      const response = await axios.get(`${SERVER}/user`, {
        params: {
          token: token.value,
        },
      });

      const message = response.data as Message;
      if (message.error) {
        return message.error;
      }

      // Got user
      user.value = message.payload as User;
    }

    return user.value as User;
  }

  const isLoggedIn = () => token.value.length > 0;

  return {
    Login,
    Logout,
    isLoggedIn,
    getUser,

    token,
    user,
  };
});
