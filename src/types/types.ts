import { ActionName, ActionStatus } from "./enums";

export interface Action {
  name: ActionName;
  credits: number;
}

export interface QueueItem {
  name: ActionName;
  status: ActionStatus;
}

export interface Queue {
  items: QueueItem[];
  nextActionIndex: number;
}

export interface UserActions {
  actions: Action[];
  queue: Queue;
  id: string;
}

export interface UserActionsResponse {
  userActions: UserActions;
  nbActionsLeft: number;
}

export interface ExecutionInterval {
  executionInvertal: number;
}
