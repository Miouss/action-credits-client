import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, QueueItem, UserActionsResponse } from "../types/types";
import { RequestFactory } from "../utils/requests";

export function useUpToDateUserActions(
  setActionsQueue: Dispatch<SetStateAction<QueueItem[]>>,
  setId: Dispatch<SetStateAction<string>>
) {
  const [actions, setActions] = useState<Action[]>();
  const [executionInterval, setExecutionInterval] = useState<number>(0);
  const [refreshCreditsInterval, setRefreshCreditsInterval] =
    useState<number>(0);

  useEffect(() => {
    const getUserActions = async () => {
      try {
        const res = await RequestFactory().userActions.get();
        const {
          userActions,
          executionInterval,
          refreshCreditsInterval,
        }: UserActionsResponse = await res.json();

        setActions(userActions.actions);
        setActionsQueue(userActions.queue.items);
        setId(userActions.id);
        setExecutionInterval(executionInterval);
        setRefreshCreditsInterval(refreshCreditsInterval);
      } catch (err) {
        alert(err);
      }
    };

    getUserActions();
  }, []);

  return { actions, executionInterval, refreshCreditsInterval };
}
