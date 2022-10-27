import {ERR, Message, OK} from '@ovc/common';

import {prisma} from '../Global'

import {Groups, Users} from '.prisma/client';

export class GroupService {
  static async Create(name: string): Promise<Message<Groups>> {
    try {
      const result = await prisma.groups.create({
        data: {
          name,
        }
      });
      console.log('Created group', name);
      return OK(result);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async Update(name: string, users: Users[], new_name: string|undefined):
      Promise<Message<Groups>> {
    try {
      if (!new_name) {
        new_name = name;
      }
      const result = await prisma.groups.update({
        where: {name: name},
        data: {
          name: new_name,
          users: {
            connect: users,
          },
        }
      });
      return OK(result);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async Delete(name: string): Promise<Message<any>> {
    try {
      await prisma.groups.delete({where: {name}});
      console.log('Deleted group', {name});
      return OK('');
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async FindByName(name: string): Promise<Message<Groups>> {
    try {
      const group = await prisma.groups.findUnique({where: {name}});
      if (group) {
        return OK(group);
      }
      return ERR('Failed to find group with name:' + name);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async FindByUserEmail(email: string): Promise<Message<Groups[]>> {
    try {
      const groups = await prisma.groups.findMany({
        where: {
          users: {
            some: {
              email,
            }
          }
        }
      });

      if (!groups) {
        return ERR('Unable to find any groups with user with email: ' + email);
      }

      return OK(groups);
    } catch (err) {
      console.error(err);
      return ERR(err);
    }
  }

  static async GetAll(): Promise<Message<Groups[]>> {
    try {
      const groups = await prisma.groups.findMany();
      if (groups) {
        return OK(groups);
      }
      return ERR('Failed to find any groups');
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }
}