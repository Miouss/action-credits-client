import { API_ACTIONS, API_ACTIONS_QUEUE } from "../config";
import { ActionName } from "../enums";

export function request() {
  return {
    userActions: () => ({
      get: async () => await getUserActions(),
    }),
    queue: () => ({
      get: () => getQueue(),
      add: async (actionName: ActionName) => await addActionToQueue(actionName),
    }),
  };
}

async function getUserActions() {
  return await requestServer(API_ACTIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function addActionToQueue(actionName: ActionName) {
  return await requestServer(API_ACTIONS_QUEUE, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ actionName }),
  });
}

async function getQueue() {
  return await requestServer(API_ACTIONS_QUEUE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function requestServer(url: RequestInfo | URL, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) throw await res.text();
  return res;
}
