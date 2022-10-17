import axios from 'axios'

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export class UserService {
  static async Login(email: string, password: string): Promise<boolean> {
    const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/login', {
      email,
      password,
    });


    console.log(response.data);
    return true;
  }
}