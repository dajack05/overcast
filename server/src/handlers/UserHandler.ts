import {ERR, Message, OK, User, UserPermission} from '@ovc/common';
import {Request} from 'express';

import {UserService} from '../services/UserService';
import {TokenManager} from '../Token';

export async function UpdateUser(req: Request): Promise<Message<User>> {
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
    id: user.payload.id,
    dob: dob ?? user.payload.password,
    email: email ?? user.payload.email,
    first_name: first_name ?? user.payload.first_name,
    last_name: last_name ?? user.payload.last_name,
    permission_level: permission_level ? Number.parseInt(permission_level) : user.payload.permission_level,
  });

  if (result.error) {
    return ERR(result.error);
  }

  return OK(UserService.Sanitize(result.payload));
}

export async function CreateUser(req: Request): Promise<Message<User>> {
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

export async function GetUser(req: Request): Promise<Message<User|User[]>> {
  if (!req.query.token) {
    return ERR('Missing token');
  }

  const token = req.query.token as string;
  // Verify token
  const is_token_valid = TokenManager.Verify(token);

  if (!is_token_valid) {
    return ERR('Invalid Token');
  }

  const result = req.query.email ?
      await UserService.FindByEmail(req.query.email as string) :
      await UserService.GetAll();
  if (result.error) {
    console.error(result.error);
    return ERR(result.error);
  }

  if (Array.isArray(result.payload)) {
    const sanitized_users = result.payload.map(u => UserService.Sanitize(u));
    return OK(sanitized_users);
  }

  return OK(UserService.Sanitize(result.payload));
}