export enum UserPermission{
  USER,
  ADMIN,
  COUNT,
}

export class User {
  first_name = "";
  last_name = "";
  email = "";
  dob = "";
  permission_level:UserPermission = UserPermission.USER;
}
