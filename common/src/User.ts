export enum UserType {
  DATA,
  VIEWER,
  ADMIN,
}

export class User {
  id = -1;
  first_name = '';
  last_name = '';
  email = '';
  dob = '';
  permission_level = UserType.DATA;
}
