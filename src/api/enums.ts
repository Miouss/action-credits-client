export const API = "http://localhost:3001/api";

export enum API_ENDPOINTS {
  ACTIONS = "/actions",
  CONFIG = "/config",
  QUEUE = "/queue",
}

export enum ActionStatus {
  PENDING = "pending",
  EXECUTED = "executed",
}
