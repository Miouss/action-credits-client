import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, UserActionsResponse } from "../types/types";
import { RequestFactory } from "../utils/requests";
import { ActionName } from "../types/enums";

export function useActionsManager(
  setActionsQueue: Dispatch<SetStateAction<ActionName[]>>,
  setId: Dispatch<SetStateAction<string>>
) {
  const [actions, setActions] = useState<Action[]>();

  useUpToDateUserActions(setActions, setActionsQueue, setId);

  return actions;
}

function useUpToDateUserActions(
  setActions: Dispatch<SetStateAction<Action[] | undefined>>,
  setActionsQueue: Dispatch<SetStateAction<ActionName[]>>,
  setId: Dispatch<SetStateAction<string>>
) {
  useEffect(() => {
    const getUserActions = async () => {
      try {
        const res = await RequestFactory().userActions.get();
        const { userActions, executionInterval }: UserActionsResponse =
          await res.json();

        setActions(userActions.actions);
        setActionsQueue(userActions.queue);
        setId(userActions.id);
        setTimeout(() => {
          getUserActions();
        }, executionInterval);
      } catch (err) {
        alert(err);
      }
    };

    getUserActions();
  }, []);
}
