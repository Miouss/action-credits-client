import { Dispatch, SetStateAction, useEffect } from "react";
import { RequestFactory } from "../utils/requests";
import { ActionName } from "../types/enums";
import { QueueFilteredByActionStatus } from "../types/types";

export function useAddActionToQueue(
  newAction: ActionName | undefined,
  setNewAction: Dispatch<SetStateAction<ActionName | undefined>>,
  setActionsQueue: Dispatch<
    SetStateAction<QueueFilteredByActionStatus | undefined>
  >
) {
  useEffect(() => {
    if (!newAction) return;

    const handleAddActionToQueue = async () => {
      try {
        const response = await RequestFactory().queue.add(newAction);
        const queue: QueueFilteredByActionStatus = await response.json();
        setActionsQueue(queue);
      } catch (err) {
        alert(err);
      } finally {
        setNewAction(undefined);
      }
    };

    handleAddActionToQueue();
  }, [newAction]);
}
