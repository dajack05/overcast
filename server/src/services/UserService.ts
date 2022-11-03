import {ERR, Message, OK, User} from '@ovc/common';
import * as bcrypt from 'bcrypt'

import {prisma} from '../Global'

import {Users} from '.prisma/client';

export interface ICreateUser {
  email: string, password: string, first_name: string, last_name: string,
      dob: string,
}

export interface IUpdateUser {
  id:number
  email?: string
  password?: string
  first_name?: string
  last_name?: string
  dob?: string
  permission_level?: number
  last_logon?: Date
}

export class UserService {
  static async Create(args: ICreateUser): Promise<Message<Users>> {
    try {
      const final_args: ICreateUser = {
        ...args,
        password: bcrypt.hashSync(args.password, 10),
      };
      const result = await prisma.users.create({data: final_args});
      console.log('Created user', args);
      return OK(result);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async Update(args: IUpdateUser): Promise<Message<Users>> {
    try {
      const result = await prisma.users.update({
        where: {id: args.id},
        data: {
          dob: args.dob,
          email: args.email,
          first_name: args.first_name,
          last_name: args.last_name,
          last_logon: args.last_logon,
          permission_level: args.permission_level,
        }
      });
      return OK(result);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async UpdateTimestamp(user: Users): Promise<Message<Users>> {
    try {
      const result = await prisma.users.update({
        where: {email: user.email},
        data: {
          ...user,
          last_logon: new Date(),
        }
      });
      return OK(result);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async Delete(email: string): Promise<Message<any>> {
    try {
      await prisma.users.delete({where: {email}});
      console.log('Deleted user', {email});
      return OK('');
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async FindByEmail(email: string): Promise<Message<Users>> {
    try {
      const user = await prisma.users.findUnique({where: {email}});
      if (user) {
        return OK(user);
      }
      return ERR('Failed to find user with email:' + email);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async FindById(id: number): Promise<Message<Users>> {
    try {
      const user = await prisma.users.findUnique({where: {id}});
      if (user) {
        return OK(user);
      }
      return ERR('Failed to find user with id ' + id);
    } catch (err) {
      console.error(err);
      ERR(err);
    }
  }

  static async GetAll(): Promise<Message<Users[]>> {
    try {
      const users = await prisma.users.findMany();
      if (users) {
        return OK(users);
      }
      return ERR('Failed to find any users');
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static Sanitize(input: Users): User {
    return {
      id: input.id,
      dob: input.dob,
      email: input.email,
      first_name: input.first_name,
      last_name: input.last_name,
      permission_level: input.permission_level
    };
  }
}