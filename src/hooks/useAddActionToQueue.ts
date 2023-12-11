import { Dispatch, SetStateAction, useEffect } from "react";
import { RequestFactory } from "../utils/requests";
import { ActionName } from "../types/enums";
import { QueueItem, UserActionsResponse } from "../types/types";

export function useAddActionToQueue(
  newAction: ActionName | undefined,
  setNewAction: Dispatch<SetStateAction<ActionName | undefined>>,
  setActionsQueue: Dispatch<SetStateAction<QueueItem[]>>,
  setNbActionsLeft: Dispatch<SetStateAction<number>>
) {
  useEffect(() => {
    if (!newAction) return;

    const handleAddActionToQueue = async () => {
      try {
        const response = await RequestFactory().userActions.queue.add(
          newAction
        );
        const { userActions, nbActionsLeft }: UserActionsResponse = await response.json();
        setNbActionsLeft(nbActionsLeft);
        setActionsQueue(userActions.queue.items);
      } catch (err) {
        alert(err);
      } finally {
        setNewAction(undefined);
      }
    };

    handleAddActionToQueue();
  }, [newAction]);
}
