import {ERR, Message, OK, User as _User} from '@ovc/common';
import e, {Request} from 'express';

import {prisma} from '../Global';
import {TokenManager} from '../Token';

import {Users} from '.prisma/client';

export async function PostUser(req: Request): Promise<Message> {
  const {
    token,
    email,
    password,
    dob,
    first_name,
    last_name,
    permission_level,
  } = req.body;

  const message = await GetUserByEmail(email);

  if (!token) {
    return ERR('Missing token');
  }

  if (!email) {
    return ERR('Missing email');
  }

  if (!password && message.error) {
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

  if (!TokenManager.Verify(token as string)) {
    return ERR('Invalid Token');
  }

  // If user exists, update info
  if (!message.error) {
    const user = message.payload as Users
    let p = user.permission_level;
    if (permission_level) {
      p = permission_level;
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

  } else {
    // Update user
    try {
      await prisma.users.create({
        data: {
          email,
          dob,
          password,
          first_name,
          last_name,
        }
      });
    } catch (err) {
      console.error(err);
      return ERR(err);
    }
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

  const is_token_valid = TokenManager.Verify(token as string);

  if (!is_token_valid) {
    return ERR('Invalid Token');
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
