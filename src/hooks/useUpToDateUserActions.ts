import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, Actions, QueueFiltered, QueueItem } from "../types/types";
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
        const res = await Promise.all([
          RequestFactory().actions.get(),
          RequestFactory().queue.get(),
        ]);

        const [actions, queue] = (await Promise.all([
          res[0].json(),
          res[1].json(),
        ])) as [Actions, QueueFiltered];

        setActions(actions.items);
        setId(actions.id);
        setNbActionsLeft(queue.nbActionsLeft);
        setActionsQueue(queue.items);
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
