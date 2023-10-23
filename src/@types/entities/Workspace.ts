import { Franchaisor } from "./Franchaisor";

export type Workspace = Franchaisor & {
    avatar: string,
    name: string,
    franchisor_id: number
  };
