import {debug} from 'debug'

import {prisma} from '../Global'

import {Users} from '.prisma/client';

const log = debug('UserService');

export interface ICreateUser {
  email: string, password: string, first_name: string, last_name: string,
      dob: string,
}

export interface IDeleteUser {
  email: string,
}

export class UserService {
  static async Create(args: ICreateUser): Promise<Users|string> {
    try {
      const result = await prisma.users.create({data: args});
      log.log('Created user', args);
      return result;
    } catch (err) {
      log.log('ERROR:' + err);
      return err;
    }
  }

  static async Delete(email:string): Promise<string|null> {
    try {
      await prisma.users.delete({where: {email}});
      log.log('Deleted user', {email});
    } catch (err) {
      log.log('ERROR:' + err);
      return err;
    }
    return null;
  }

  static async FindByEmail(email:string):Promise<Users>{
    
  }
}