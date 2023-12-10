import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, UserActionsResponse } from "../types/types";
import { RequestFactory } from "../utils/requests";
import { ActionName } from "../types/enums";

export function useUpToDateUserActions(
  setActionsQueue: Dispatch<SetStateAction<ActionName[]>>,
  setId: Dispatch<SetStateAction<string>>
) {
  const [actions, setActions] = useState<Action[]>();
  const [executionInterval, setExecutionInterval] = useState<number>(0);
  const [refreshCreditsInterval, setRefreshCreditsInterval] = useState<number>(0);

  useEffect(() => {
    const getUserActions = async () => {
      try {
        const res = await RequestFactory().userActions.get();
        const { userActions, executionInterval, refreshCreditsInterval }: UserActionsResponse =
          await res.json();

        setActions(userActions.actions);
        setActionsQueue(userActions.queue);
        setId(userActions.id);
        setExecutionInterval(executionInterval);
        setRefreshCreditsInterval(refreshCreditsInterval);
        setTimeout(() => {
          getUserActions();
        }, executionInterval);
      } catch (err) {
        alert(err);
      }
    };

    getUserActions();
  }, []);

  return { actions, executionInterval, refreshCreditsInterval };
}
