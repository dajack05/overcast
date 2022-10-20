import {ERR, Message, OK, User as _User, UserPermission} from '@ovc/common';
import {Request} from 'express';

import {prisma} from '../Global';
import {TokenManager} from '../Token';

import { Users} from '.prisma/client';

export async function UpdateUser(req: Request): Promise<Message> {
  const token = req.body.token as string;
  const email = req.body.email as string;
  const password = req.body.password as string;
  const dob = req.body.dob as string;
  const first_name = req.body.first_name as string;
  const last_name = req.body.last_name as string;
  const permission_level = req.body.permission_level as string;

  if (!token) {
    return ERR('Missing Token');
  }

  if (!email) {
    return ERR('Missing Email');
  }

  const token_data = TokenManager.Verify(token);
  if(!token){
    return ERR('Invalid Token');
  }

  if(token_data.permission_level !== UserPermission.ADMIN){
    return ERR('Not authorized to update user');
  }

  const user = (await GetUserByEmail(email)).payload as Users
  let p = user.permission_level;
  if (permission_level) {
    p = Number.parseInt(permission_level);
  }

  // Update user
  try {
    await prisma.users.update({
      where: {email},
      data: {
        ...user,
        email,
        dob,
        password,
        first_name,
        last_name,
        permission_level: p,
      }
    });
  } catch (err) {
    console.error(err);
    return ERR(err);
  }
}

export async function CreateUser(req: Request): Promise<Message> {
  const {
    token,
    email,
    password,
    dob,
    first_name,
    last_name,
  } = req.body;

  if (!token) {
    return ERR('Missing token');
  }

  if (!email) {
    return ERR('Missing email');
  }

  if (!password) {
    return ERR('Missing password');
  }

  if (!dob) {
    return ERR('Missing dob');
  }

  if (!first_name) {
    return ERR('Missing first name');
  }

  if (!last_name) {
    return ERR('Missing last name');
  }

  const token_data = TokenManager.Verify(token as string);
  if (!token_data) {
    return ERR('Invalid Token');
  }

  if(token_data.permission_level !== UserPermission.ADMIN){
    return ERR('Must be admin to create user');
  }

  try {
    await prisma.users.create({
      data: {
        email:email as string,
        dob:dob as string,
        password:password as string,
        first_name:first_name as string,
        last_name:last_name as string,
      }
    });
  } catch (err) {
    if(err.code === "P2002"){
      return ERR("Email Already Registered");
    }
    console.error(err.code);
    return ERR(err);
  }

  return OK('OK');
}

export async function RemoveUser(req: Request): Promise<Message> {
  const {token, email} = req.query;
  if (!token) {
    return ERR('Missing Token');
  }

  if (!email) {
    return ERR('Missing Email');
  }

  const token_data = TokenManager.Verify(token as string);
  if (!token_data) {
    return ERR('Invalid Token');
  }

  if(token_data.permission_level !== UserPermission.ADMIN){
    return ERR('You do not have permission to delete this user');
  }

  try {
    await prisma.users.delete({
      where: {
        email: email as string,
      }
    });

  } catch (err) {
    console.error(err);
    return ERR(err);
  }

  return OK('OK');
}

export async function GetUser(req: Request): Promise<Message> {
  if (!req.query.token) {
    return ERR('Missing token');
  }

  const token = req.query.token as string;
  // Verify token
  const is_token_valid = TokenManager.Verify(token);

  if (!is_token_valid) {
    return ERR('Invalid Token');
  }

  if (req.query.email) {
    return await GetUserByEmail(req.query.email as string);
  } else {
    return await GetAllUsers();
  }
}

async function GetAllUsers(): Promise<Message> {
  try {
    const users = await prisma.users.findMany();

    const safe_users = users.map((user) => {
      return {
        dob: user.dob,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        permission_level: user.permission_level,
      } as _User;
    });

    return OK(safe_users);
  } catch (err) {
    console.error(err);
    return ERR(err);
  }
}

async function GetUserByEmail(email: string): Promise<Message> {
  try {
    const user = await prisma.users.findFirst({
      where: {email},
    });

    if (!user) {
      return ERR(`Failed to find user with email "${email}"`);
    }

    return OK({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      dob: user.dob,
      permission_level: user.permission_level,
    } as _User);
  } catch (err) {
    console.error(err);
    return ERR(err);
  }
}
