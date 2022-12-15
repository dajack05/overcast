import {useUserStore} from '@/stores/user';
import type {Group, Message} from '@ovc/common';
import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER_URL;

export class GroupService {
  static async Create(name: string): Promise<string|undefined> {
    const result =
        await axios.put(`${SERVER}/group`, {name, token: useUserStore().token});
    const msg = result.data as Message<Group>;
    if (msg.error) {
      return msg.error;
    }
    return undefined;
  }

  static async GetAll(): Promise<Group[]> {
    const result = await axios.get(
        `${SERVER}/group`, {params: {token: useUserStore().token}});
    const message = result.data as Message<Group[]>;
    if (message.error) {
      console.error(message.error);
      return [];
    }

    if (!message.payload) {
      console.error('Payload empty');
      return [];
    }

    return message.payload;
  }

  static async GetByEmail(email:string): Promise<Group[]> {
    const result = await axios.get(
        `${SERVER}/group`, {params: {token: useUserStore().token, email:email}});
    const message = result.data as Message<Group[]>;
    if (message.error) {
      console.error(message.error);
      return [];
    }

    if (!message.payload) {
      console.error('Payload empty');
      return [];
    }

    return message.payload;
  }

  static async Update(group: Group): Promise<Group|string> {
    const result = await axios.post(`${SERVER}/group`, {
      id: group.id,
      name: group.name,
      user_ids: group.users.map(u => u.id),
      token: useUserStore().token,
    });

    const message = result.data as Message<Group>;
    if (message.error) {
      console.error(message.error);
      return message.error;
    }

    if (!message.payload) {
      console.error('Payload empty');
      return 'Payload empty';
    }

    return message.payload;
  }

  static async Remove(group: Group): Promise<string|undefined> {
    const result = await axios.delete(`${SERVER}/group`, {
      params: {
        id: group.id,
        token: useUserStore().token,
      }
    });

    const message = result.data as Message<any>;
    if (message.error) {
      console.error(message.error);
      return message.error;
    }
    
    return undefined;
  }
}