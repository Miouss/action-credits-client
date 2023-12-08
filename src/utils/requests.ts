import { API_ACTIONS, API_ACTIONS_QUEUE } from "../config";
import { User, ActionName } from "../enums";

async function fetchServer(url: RequestInfo | URL, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) throw await res.text();

  return res;
}

export async function requestActions(username: User) {
  return await fetchServer(API_ACTIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
}

export async function requestActionsQueue(
  username: User,
  actionName: ActionName
) {
  return await fetchServer(API_ACTIONS_QUEUE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, actionName }),
  });
}
