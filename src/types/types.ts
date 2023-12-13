import { ActionName, ActionStatus } from "./enums";

export type Status = "pending" | "executed";
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
export interface Queue {
  executed: ActionName[];
  pending: ActionName[];
}

export interface QueueByStatusWithExecutedHistory {
  items: Queue;
  executedItemsHistory: number;
}
