import { API_ENDPOINTS, ActionStatus } from "../types/enums";

const API = "http://localhost:3001/api";

export const MAX_ACTION_LIMIT = 3;

const API_QUEUE_QUERIES = `?statuses=${ActionStatus.PENDING},${ActionStatus.COMPLETED}&count=${MAX_ACTION_LIMIT}&order=asc`;

export const API_ACTIONS = API + API_ENDPOINTS.ACTIONS;
export const API_CONFIG = API + API_ENDPOINTS.CONFIG;
export const API_QUEUE = API + API_ENDPOINTS.QUEUE + API_QUEUE_QUERIES;
