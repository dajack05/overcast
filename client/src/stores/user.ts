import { User, type Message } from "@ovc/common";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import jwtDecode from "jwt-decode";

const SERVER = import.meta.env.VITE_SERVER_URL;

export const useUserStore = defineStore("user", () => {
  const token = ref("");
  const user = ref<User>(new User());

  const cookies = useCookies();

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
    cookies.cookies.set("token", token.value, "1m");
    user.value.email = email;

    // Now get the user
    const result = await getUser();
    if (typeof result === "string") {
      console.error(result);
    }

    return;
  }

  function Logout() {
    token.value = "";
    user.value = new User();
    cookies.cookies.remove("token");
  }

  /**
   * Returns the user or error strings if not logged in
   */
  async function getUser(): Promise<User | string> {
    if (!isLoggedIn()) {
      return "User Not Logged In";
    }

    if (!isUserPopulated()) {
      const response = await axios.get(`${SERVER}/user`, {
        params: {
          token: token.value,
          email: user.value.email,
        },
      });

      const message = response.data as Message;
      if (message.error) {
        Logout();
        return message.error;
      }

      // Got user
      user.value = message.payload as User;
      console.log(message.payload);
    }

    return user.value as User;
  }

  const isUserPopulated = () =>
    user.value.first_name.length > 0 && user.value.last_name.length > 0;

  function isLoggedIn(): boolean {
    if (token.value.length > 0) {
      return true;
    }

    // Do we have a token cookie?
    if (cookies.cookies.isKey("token")) {
      const cookie_token = cookies.cookies.get("token");

      // Is it semi-valid?
      if (cookie_token.length > 0) {
        // Can we get the email from within it?
        const decoded = jwtDecode<{ email: string; iat: number }>(cookie_token);
        if (!decoded || !decoded.email) {
          return false;
        }

        token.value = cookie_token;
        user.value.email = decoded.email;
        
        getUser().then((v) => {
          if (typeof v === "string") {
            console.error(v);
          }
        });
        return true;
      }
    }

    return false;
  }

  return {
    Login,
    Logout,
    isLoggedIn,
    getUser,

    token,
    user,
  };
});
