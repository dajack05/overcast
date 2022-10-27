export enum UserPermission {
  USER,
  ADMIN,
  COUNT,
}

export class User {
  id = -1;
  first_name = '';
  last_name = '';
  email = '';
  dob = '';
  permission_level: UserPermission = UserPermission.USER;
}
