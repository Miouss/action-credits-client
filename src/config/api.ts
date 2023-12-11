import { MAX_EXECUTED_ACTION_LIMIT, MAX_PENDING_ACTION_LIMIT } from "./misc";

const API = "http://localhost:3001/api";

const API_QUEUE_QUERIES = `?maxPendingActions=${MAX_EXECUTED_ACTION_LIMIT}&maxExecutedActions=${MAX_PENDING_ACTION_LIMIT}`;

export const API_USER_ACTIONS = API + `/user-actions` + API_QUEUE_QUERIES;
export const API_USER_ACTIONS_REFRESH_INTERVAL =
  API + "/user-actions/refresh-interval";
export const API_USER_ACTIONS_QUEUE = API + "/user-actions/queue" + API_QUEUE_QUERIES;
