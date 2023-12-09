import { API_ACTIONS, API_ACTIONS_QUEUE } from "../config";
import { ActionName } from "../enums";

async function fetchServer(url: RequestInfo | URL, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) throw await res.text();
  return res;
}

export async function requestUserActions() {
  return await fetchServer(API_ACTIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function requestAddActionToQueue(actionName: ActionName) {
  return await fetchServer(API_ACTIONS_QUEUE, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ actionName }),
  });
}

export async function requestQueue() {
  return await fetchServer(API_ACTIONS_QUEUE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
