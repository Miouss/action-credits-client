import { Dispatch, SetStateAction, useEffect } from "react";
import { RequestFactory } from "../utils/requests";
import { ActionName } from "../types/enums";

export function useAddActionToQueue(
  newAction: ActionName | undefined,
  setNewAction: Dispatch<SetStateAction<ActionName | undefined>>,
  setActionsQueue: Dispatch<SetStateAction<ActionName[]>>
) {
  useEffect(() => {
    if (!newAction) return;

    const handleAddActionToQueue = async () => {
      try {
        const response = await RequestFactory().queue.add(newAction);
        const body = await response.json();
        setActionsQueue(body.userActions.queue);
      } catch (err) {
        alert(err);
      } finally {
        setNewAction(undefined);
      }
    };

    handleAddActionToQueue();
  }, [newAction]);
}
