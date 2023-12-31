import { BaseEntity } from './BaseEntity';
import { ROLE } from './Role';

export type BaseUser = BaseEntity & {
  email: Email;
  phone: string;
  role: ROLE;
  confirmedHash: string | null;
  restoreToken: string | null;
};
