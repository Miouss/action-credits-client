import { API_AUTH, API_ACTIONS, API_ACTIONS_QUEUE } from "../config";
import { ActionName, User } from "../enums";

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

export async function requestUserActions(token: string) {
  return await fetchServer(API_ACTIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function requestAddActionToQueue(
  token: string,
  actionName: ActionName
) {
  return await fetchServer(API_ACTIONS_QUEUE, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ actionName }),
  });
}

export async function requestQueue(token: string) {
  return await fetchServer(API_ACTIONS_QUEUE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
