import { School } from './school';
import { Role } from './role';

export interface User {
  Id: string;
  Name: string;
  UserName: string;
  Email: string;
  PhoneNumber: number;
  SchoolId: number;
  School: School;
  UserRoleId: number;
  UserRole: Role;
  Password: string;
  ConfirmPassword: string;
}
