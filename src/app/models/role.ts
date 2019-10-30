import { Privileges } from './priviledges';

export interface Role {
  Id: number;
  Name: string;
  Notes: string;
  Priviledges: Privileges;
  userId: string;
}
