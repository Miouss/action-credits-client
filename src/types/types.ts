import { ActionName, ActionStatus } from "./enums";

export type Status = "pending" | "completed";
export interface Queue {
  items: QueueItem[];
  nextActionIndex: number;
}

export interface QueueItem {
  name: ActionName;
  status: ActionStatus;
}
export interface Action {
  name: ActionName;
  credits: number;
}

export interface Actions {
  items: Action[];
  id: string;
}

export interface ExecutionInterval {
  executionInvertal: number;
}
export interface QueueItemsByActionStatus {
  executed: ActionName[];
  pending: ActionName[];
}

export interface QueueFilteredByActionStatus {
  items: QueueItemsByActionStatus;
  executedItemsHistory: number;
}
