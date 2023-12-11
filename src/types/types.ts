import { ActionName, ActionStatus } from "./enums";
export interface Queue {
  items: QueueItem[];
  nextActionIndex: number;
}

export interface QueueItem {
  name: ActionName;
  status: ActionStatus;
}

export interface QueueFiltered {
  items: QueueItem[];
  nbActionsLeft: number;
  nbActionsDone: number;
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
