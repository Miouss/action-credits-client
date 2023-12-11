import { Dispatch, SetStateAction, useEffect } from "react";
import { RequestFactory } from "../utils/requests";
import { ActionName } from "../types/enums";
import { QueueFiltered, QueueItem } from "../types/types";

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
        const response = await RequestFactory().queue.add(newAction);
        const { items, nbActionsLeft }: QueueFiltered = await response.json();
        setNbActionsLeft(nbActionsLeft);
        setActionsQueue(items);
      } catch (err) {
        alert(err);
      } finally {
        setNewAction(undefined);
      }
    };

    handleAddActionToQueue();
  }, [newAction]);
}
