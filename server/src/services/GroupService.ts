import {ERR, Group, Message, OK} from '@ovc/common';

import {prisma} from '../Global'

import {UserService} from './UserService';
import {Groups, Prisma, Users} from '.prisma/client';

export type FullGroups = Groups&{
  users: Users[];
}

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
      Promise<Message<FullGroups>> {
    try {
      if (!new_name) {
        new_name = name;
      }

      await prisma.groups.update({
        where: {name: name},
        data: {
          name: new_name,
          users: {
            connect: users.map((u=>({email:u.email}))),
          }
        }
      });

      return await GroupService.FindByName(name);

    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async Delete(id: number): Promise<Message<any>> {
    try {
      await prisma.groups.delete({where: {id}});
      console.log('Deleted group with id ', {id});
      return OK('');
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }


  static async FindByName(name: string): Promise<Message<FullGroups>> {
    try {
      const group = await prisma.groups.findUnique(
          {where: {name}, include: {users: true}});
      if (group) {
        return OK(group);
      }
      return ERR('Failed to find group with name:' + name);
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static async FindById(id: number): Promise<Message<FullGroups>> {
    try {
      const groups =
          await prisma.groups.findUnique({where: {id}, include: {users: true}});

      if (!groups) {
        return ERR('Unable to find any groups with id ' + id);
      }

      return OK(groups);
    } catch (err) {
      console.error(err);
      return ERR(err);
    }
  }

  static async FindByUserEmail(email: string): Promise<Message<FullGroups[]>> {
    try {
      const groups = await prisma.groups.findMany({
        where: {
          users: {
            some: {
              email,
            }
          }
        },
        include: {
          users: true,
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

  static async GetAll(): Promise<Message<FullGroups[]>> {
    try {
      const groups = await prisma.groups.findMany({include: {users: true}});
      if (groups) {
        return OK(groups);
      }
      return ERR('Failed to find any groups');
    } catch (err) {
      console.log('ERROR:' + err);
      return ERR(err);
    }
  }

  static Sanitize(input: Groups|FullGroups): Group {
    const i = input as FullGroups;
    const g = new Group();
    g.id = i.id;
    g.name = i.name;
    g.users = [];
    if (i.users) {
      g.users = i.users.map(u => UserService.Sanitize(u));
    }
    return g;
  }
}