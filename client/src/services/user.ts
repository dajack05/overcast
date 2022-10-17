import { useUserStore } from "@/stores/user";
import type { Message } from "@ovc/common";
import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL;

export class UserService {
  static async Register(
    email: string,
    password: string,
    dob: string,
    first_name: string,
    last_name: string
  ): Promise<string | undefined> {
    const response = await axios.post(`${SERVER}/user`, {
      token: useUserStore().token,
      email: email,
      password: password,
      dob: dob,
      first_name: first_name,
      last_name: last_name,
    });

    const message = response.data as Message;
    if (message.error) {
      return message.error;
    }

    console.log(message.payload);
  }
}
