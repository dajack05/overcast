import { useUserStore } from "@/stores/user";
import { ERR, OK, type Message, type User } from "@ovc/common";
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
    const response = await axios.put(`${SERVER}/user`,{
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

  static async GetAll(): Promise<User[] | string> {
    const userStore = useUserStore();
    const response = await axios.get(`${SERVER}/user`, {
      params: {
        token: userStore.token,
      },
    });

    const message = response.data as Message;
    if (message.error) {
      return message.error;
    }

    return message.payload as User[];
  }

  static async GetByEmail(email: string): Promise<User | string> {
    const userStore = useUserStore();
    if (!userStore.isLoggedIn()) {
      return "User Not Logged In";
    }

    const response = await axios.get(`${SERVER}/user`, {
      params: {
        token: userStore.token,
        email,
      },
    });

    const message = response.data as Message;
    if (message.error) {
      return message.error;
    }

    // Got user
    const user = message.payload as User;
    return user;
  }

  static async Login(email: string, password: string): Promise<Message> {
    const response = await axios.post(`${SERVER}/login`, {
      email,
      password,
    });

    // Did we get a token?
    const message = response.data as Message;
    if (message.error) {
      return ERR(message.error);
    }

    // We got a token!
    const token = message.payload as string;

    return OK(token);
  }

  static async Update(user: User): Promise<Message> {
    const response = await axios.post(`${SERVER}/user`, {
      ...user,
      token: useUserStore().token,
    });

    const message = response.data as Message;
    return message;
  }

  static async Remove(user:User): Promise<Message>{
    const token = useUserStore().token;
    const response = await axios.delete(`${SERVER}/user`, {
      params:{
        token,
        ...user,
      }
    });

    return response.data as Message;
  }
}
