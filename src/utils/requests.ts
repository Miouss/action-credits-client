import {
  API_USER_ACTIONS,
  API_USER_ACTIONS_QUEUE,
  API_USER_ACTIONS_REFRESH_INTERVAL,
} from "../config";
import { ActionName } from "../types/enums";

export function RequestFactory() {
  return {
    userActions: {
      get: async () => await getUserActions(),
      queue: {
        add: async (actionName: ActionName) =>
          await addActionToQueue(actionName),
      },
      refreshInterval: {
        get: async () => await getRefreshInterval(),
      },
    },
  };
}

async function getUserActions() {
  return await requestServer(API_USER_ACTIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getRefreshInterval() {
  return await requestServer(API_USER_ACTIONS_REFRESH_INTERVAL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function addActionToQueue(actionName: ActionName) {
  return await requestServer(API_USER_ACTIONS_QUEUE, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ actionName }),
  });
}

async function requestServer(url: RequestInfo | URL, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) throw await res.text();
  return res;
}
