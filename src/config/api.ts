const API = "http://localhost:3001/api";

export const MAX_PENDING_ACTION_LIMIT = 4;
export const MAX_EXECUTED_ACTION_LIMIT = 1;

const API_QUEUE_QUERIES = `?maxPendingActions=${MAX_PENDING_ACTION_LIMIT}&maxExecutedActions=${MAX_EXECUTED_ACTION_LIMIT}`;

export const API_ACTIONS = API + `/actions`;
export const API_CONFIG = API + "/config";
export const API_QUEUE = API + "/queue" + API_QUEUE_QUERIES;
