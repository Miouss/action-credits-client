import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, QueueItem, UserActionsResponse } from "../types/types";
import { RequestFactory } from "../utils/requests";
import { UPDATED_USER_ACTIONS_INTERVAL } from "../config/misc";

export function useUpToDateUserActions(
  setActionsQueue: Dispatch<SetStateAction<QueueItem[]>>,
  setId: Dispatch<SetStateAction<string>>,
  setNbActionsLeft: Dispatch<SetStateAction<number>>
) {
  const [actions, setActions] = useState<Action[]>();

  useEffect(() => {
    const getUserActions = async () => {
      try {
        const res = await RequestFactory().userActions.get();
        const {userActions, nbActionsLeft}: UserActionsResponse = await res.json();

        setNbActionsLeft(nbActionsLeft);
        setActions(userActions.actions);
        setActionsQueue(userActions.queue.items);
        setId(userActions.id);
        setTimeout(() => {
          getUserActions();
        }, UPDATED_USER_ACTIONS_INTERVAL);
      } catch (err) {
        alert(err);
      }
    };

    getUserActions();
  }, []);

  return actions;
}
