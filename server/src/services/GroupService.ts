import {ERR, Message, OK, User} from '@ovc/common';

import {prisma} from '../Global'

import {Groups, Users} from '.prisma/client';

export class GroupService {
  static async Create(name:string): Promise<Message<Groups>> {
    try {
      const result = await prisma.groups.create({data: {
        name,
      }});
      console.log('Created group', name);
      return OK(result);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async Update(name:string, users:Users[], new_name:string|undefined): Promise<Message<Groups>> {
    try {
      if(!new_name){
        new_name = name;
      }
      const result = await prisma.groups.update({
        where: {name:name},
        data: {
          name:new_name,
          
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
      dob: input.dob,
      email: input.email,
      first_name: input.first_name,
      last_name: input.last_name,
      permission_level: input.permission_level
    };
  }
}