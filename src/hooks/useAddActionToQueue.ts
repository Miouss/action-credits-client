import { Dispatch, SetStateAction, useEffect } from "react";
import { requestAddActionToQueue } from "../utils/requests";
import { ActionName } from "../enums";

export function useAddActionToQueue(
  newAction: ActionName | undefined,
  setNewAction: Dispatch<SetStateAction<ActionName | undefined>>
) {
  useEffect(() => {
    if (!newAction) return;

    const handleAddActionToQueue = async () => {
      try {
        await requestAddActionToQueue(
          localStorage.getItem("token") ?? "",
          newAction
        );

        setNewAction(undefined);
      } catch (err) {
        alert(err);
      } finally {
        setNewAction(undefined);
      }
    };

    handleAddActionToQueue();
  }, [newAction]);
}
