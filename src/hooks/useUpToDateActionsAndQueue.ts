import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Action,
  Actions,
  QueueFilteredByActionStatus,
} from "../types/types";
import { RequestFactory } from "../utils/requests";
import { UPDATED_ACTIONS_AND_QUEUE_INTERVAL } from "../config/misc";

export function useUpToDateActionsAndQueue(
  setQueue: Dispatch<SetStateAction<QueueFilteredByActionStatus | undefined>>,
  setId: Dispatch<SetStateAction<string>>
) {
  const [actions, setActions] = useState<Action[]>();

  useEffect(() => {
    const getActionsAndQueue = async () => {
      try {
        const res = await Promise.all([
          RequestFactory().actions.get(),
          RequestFactory().queue.get(),
        ]);

        const [actions, queue] = (await Promise.all([
          res[0].json(),
          res[1].json(),
        ])) as [Actions, QueueFilteredByActionStatus];

        setActions(actions.items);
        setId(actions.id);
        setQueue(queue);
        setTimeout(() => {
          getActionsAndQueue();
        }, UPDATED_ACTIONS_AND_QUEUE_INTERVAL);
      } catch (err) {
        alert(err);
      }
    };

    getActionsAndQueue();
  }, []);

  return actions;
}
