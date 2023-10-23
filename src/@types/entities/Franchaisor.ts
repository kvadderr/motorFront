import { BaseUser } from './BaseUser';

export type Franchaisor = BaseUser & {
    FIO: string,
    company: string
  };
