import { ActionName } from "./enums";

export interface Action {
  name: ActionName;
  credits: number;
}

export interface UserActions {
  actions: Action[];
  queue: ActionName[];
  id: string;
}

export interface ExecutionInterval {
  executionInvertal: number;
}

export interface UserActionsResponse  {
  userActions: UserActions;
  executionInterval: number;
  refreshCreditsInterval: number;
}