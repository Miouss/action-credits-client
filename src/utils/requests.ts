import { API_AUTH, API_ACTIONS, API_ACTIONS_QUEUE } from "../config";
import { User, ActionName } from "../enums";

async function fetchServer(url: RequestInfo | URL, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) throw await res.text();

  return res;
}

export async function requestToken(username: User) {
  return await fetchServer(API_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
}

export async function requestActions(token: string) {
  return await fetchServer(API_ACTIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
}

export async function requestActionsQueue(
  token: string,
  actionName: ActionName
) {
  return await fetchServer(API_ACTIONS_QUEUE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, actionName }),
  });
}
