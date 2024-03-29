import {useUserStore} from '@/stores/user';
import {ERR, OK, type Message, type User} from '@ovc/common';
import axios from 'axios';
import {sha256} from 'hash.js'

const SERVER = import.meta.env.VITE_SERVER_URL;

export class UserService {
  static async Register(
      email: string, password: string, dob: string, first_name: string,
      last_name: string): Promise<string|undefined> {
    const safe_password = sha256().update(password).digest('hex');

    const response = await axios.put(`${SERVER}/user`, {
      token: useUserStore().token,
      email: email,
      password: safe_password,
      dob: dob,
      first_name: first_name,
      last_name: last_name,
    });

    const message = response.data as Message<User>;
    if (message.error) {
      return message.error;
    }
  }

  static async GetAll(): Promise<User[]|string> {
    const userStore = useUserStore();
    const response = await axios.get(`${SERVER}/user`, {
      params: {
        token: userStore.token,
      },
    });

    const message = response.data as Message<User[]>;
    if (message.error) {
      return message.error;
    }

    return message.payload as User[];
  }

  static async GetById(id:number):Promise<User|string>{
    const userStore = useUserStore();
    if (!userStore.isLoggedIn()) {
      return 'User Not Logged In';
    }

    const response = await axios.get(`${SERVER}/user`, {
      params: {
        token: userStore.token,
        id,
      },
    });

    const message = response.data as Message<User>;
    if (message.error) {
      return message.error;
    }

    // Got user
    const user = message.payload as User;
    return user;
  }

  static async GetByEmail(email: string): Promise<User|string> {
    const userStore = useUserStore();
    if (!userStore.isLoggedIn()) {
      return 'User Not Logged In';
    }

    const response = await axios.get(`${SERVER}/user`, {
      params: {
        token: userStore.token,
        email,
      },
    });

    const message = response.data as Message<User>;
    if (message.error) {
      return message.error;
    }

    // Got user
    const user = message.payload as User;
    return user;
  }

  static async Login(email: string, password: string):
      Promise<Message<string>> {
        
    const safe_password = sha256().update(password).digest('hex');
    const response = await axios.post(`${SERVER}/login`, {
      email: email,
      password: safe_password,
    });

    // Did we get a token?
    const message = response.data as Message<string>;
    if (message.error) {
      return ERR(message.error);
    }

    // We got a token!
    const token = message.payload as string;

    return OK(token);
  }

  static async Update(user: User): Promise<Message<User>> {
    const response = await axios.post(`${SERVER}/user`, {
      ...user,
      token: useUserStore().token,
    });

    const message = response.data as Message<User>;
    return message;
  }

  static async Remove(user: User): Promise<string|undefined> {
    const token = useUserStore().token;
    const response = await axios.delete(`${SERVER}/user`, {
      params: {
        token,
        ...user,
      }
    });

    const data = response.data as Message<any>;
    if (data.error) {
      return data.error;
    }
  }
}
