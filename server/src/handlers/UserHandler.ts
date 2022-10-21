import {ERR, Message, OK, User as _User, UserPermission} from '@ovc/common';
import {Request} from 'express';

import {UserService} from '../services/UserService';
import {TokenManager} from '../Token';

import {Users} from '.prisma/client';

export async function UpdateUser(req: Request): Promise<Message<_User>> {
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
  if (!token_data || token_data.permission_level !== UserPermission.ADMIN) {
    return ERR('Insufficient Permissons');
  }

  const user = await UserService.FindByEmail(email);
  if (user.error) {
    console.error(user.error);
    return ERR(user.error);
  }

  const result = await UserService.Update({
    user: user.payload,
    dob,
    email,
    first_name,
    last_name,
    password,
    permission_level: Number.parseInt(permission_level),
  });

  if (result.error) {
    return ERR(result.error);
  }

  return OK(UserService.Sanitize(result.payload));
}

export async function CreateUser(req: Request): Promise<Message<_User>> {
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

  if (!token_data || token_data.permission_level !== UserPermission.ADMIN) {
    return ERR('Invalid Token');
  }

  return await UserService.Create({
    dob: dob as string,
    email: email as string,
    first_name: first_name as string,
    last_name: last_name as string,
    password: password as string,
  });
}

export async function RemoveUser(req: Request): Promise<Message<any>> {
  const {token, email} = req.query;
  if (!token) {
    return ERR('Missing Token');
  }

  if (!email) {
    return ERR('Missing Email');
  }

  const token_data = TokenManager.Verify(token as string);

  if (!token_data || token_data.permission_level !== UserPermission.ADMIN) {
    return ERR('Invalid Token');
  }

  return await UserService.Delete(email as string);
}

export async function GetUser(req: Request): Promise<Message<Users|Users[]>> {
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
    return await UserService.FindByEmail(req.query.email as string);
  } else {
    return await UserService.GetAll();
  }
}