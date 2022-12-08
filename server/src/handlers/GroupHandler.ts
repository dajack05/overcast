import { Users } from '.prisma/client';
import {ERR, Group, Message, OK, UserType} from '@ovc/common';
import {Request} from 'express';

import {GroupService} from '../services/GroupService';
import {UserService} from '../services/UserService';
import {TokenManager} from '../Token';

export async function UpdateGroup(req: Request): Promise<Message<Group>> {
  const token = req.body.token as string;
  const name = req.body.name as string;
  const new_name = req.body.new_name as string;
  const user_ids = req.body.user_ids as number[];

  if (!token) {
    return ERR('Missing Token');
  }

  if (!name) {
    return ERR('Missing Group Name');
  }

  if (!user_ids) {
    return ERR('Missing users');
  }

  const token_data = TokenManager.Verify(token);
  if (!token_data || token_data.user_type !== UserType.ADMIN) {
    return ERR('Insufficient Permissons');
  }

  const group = await GroupService.FindByName(name);
  if (group.error) {
    console.error(group.error);
    return ERR(group.error);
  }

  const users:Users[] = [];
  for (const id of user_ids) {
    const u = await UserService.FindById(id);
    if (u.error) {
      console.error(u.error);
    } else {
      users.push(u.payload);
    }
  }
  const result = await GroupService.Update(name, users, new_name);

  if (result.error) {
    return ERR(result.error);
  }

  return OK(GroupService.Sanitize(result.payload));
}

export async function CreateGroup(req: Request): Promise<Message<Group>> {
  const {
    token,
    name,
  } = req.body;

  if (!token) {
    return ERR('Missing token');
  }

  const token_data = TokenManager.Verify(token as string);
  if (!token_data || token_data.user_type !== UserType.ADMIN) {
    return ERR('Invalid Token');
  }

  if (!name) {
    return ERR('Missing group name');
  }


  const group = await GroupService.Create(name as string);
  if(group.error){
    console.error(group.error);
    return ERR(group.error);
  }

  return OK(GroupService.Sanitize(group.payload));
}

export async function RemoveGroup(req: Request): Promise<Message<any>> {
  const {token, id} = req.query;
  if (!token) {
    return ERR('Missing Token');
  }

  const token_data = TokenManager.Verify(token as string);
  if (!token_data || token_data.user_type !== UserType.ADMIN) {
    return ERR('Invalid Token');
  }

  if (!id) {
    return ERR('Missing Id');
  }

  return await GroupService.Delete(Number.parseInt(id as string));
}

export async function GetGroup(req: Request): Promise<Message<Group|Group[]>> {
  if (!req.query.token) {
    return ERR('Missing token');
  }

  const token = req.query.token as string;
  // Verify token
  const is_token_valid = TokenManager.Verify(token);

  if (!is_token_valid) {
    return ERR('Invalid Token');
  }

  const result = req.query.id ? await GroupService.FindById(Number.parseInt(req.query.id as string)) : await GroupService.GetAll();
  if(result.error){
    console.error(result.error);
    return ERR(result.error);
  }

  if(Array.isArray(result.payload)){
    const sanitized_groups = result.payload.map(g=>GroupService.Sanitize(g));
    return OK(sanitized_groups);
  }

  return OK(GroupService.Sanitize(result.payload));
}