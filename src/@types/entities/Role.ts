import { BaseEntity } from './BaseEntity';

export enum ROLE {
    ROOT = 'root',
    ADMIN = 'admin',
    MANAGER = 'manager',
    FRANCHISOR = 'franchisor',
    FRANCHISEE = 'franchisee',
    EMPLOYEE = 'employee',
}

export type Role = BaseEntity & {
  name: ROLE;
};
