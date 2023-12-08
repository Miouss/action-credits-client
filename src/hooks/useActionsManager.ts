import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, UserActions } from "../types";
import { ActionName } from "../enums";
import { DEFAULT_USER, EXECUTION_INTERVAL } from "../config";
import {
  requestActions,
  requestActionsQueue,
  requestToken,
} from "../utils/requests";

export function useActionsManager(
  actionsQueue: ActionName[],
  setActionsQueue: Dispatch<SetStateAction<ActionName[]>>
) {
  const [actions, setActions] = useState<Action[]>();
  const [executeAction, setExecuteAction] = useState(false);

  useActionsAvailable(setActions);

  useExecutionHandler(
    actionsQueue,
    setActionsQueue,
    setActions,
    executeAction,
    setExecuteAction
  );

  useExecutionInterval(actionsQueue, setExecuteAction);

  return actions;
}

function useActionsAvailable(
  setActions: Dispatch<SetStateAction<Action[] | undefined>>
) {
  useEffect(() => {
    try {
      const getActions = async () => {
        const res2 = await requestToken(DEFAULT_USER);
        const { token } = await res2.json();
        localStorage.setItem("token", token);

        const res = await requestActions(token);
        const data: UserActions = await res.json();
        setActions(data.actions);
      };

      getActions();
    } catch (err) {
      alert(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function useExecutionHandler(
  actionsQueue: ActionName[],
  setActionsQueue: Dispatch<SetStateAction<ActionName[]>>,
  setActions: Dispatch<SetStateAction<Action[] | undefined>>,
  executeAction: boolean,
  setExecuteAction: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    if (!executeAction) return;

    const handleExecuteAction = async () => {
      try {
        const res = await requestActionsQueue(
          localStorage.getItem("token") ?? "",
          actionsQueue[0]
        );
        const { actions }: UserActions = await res.json();

        setActionsQueue((actionsQueue) => actionsQueue.slice(1));
        setActions(actions);
      } catch (err) {
        alert(err);
      } finally {
        setExecuteAction(false);
      }
    };

    handleExecuteAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeAction]);
}

function useExecutionInterval(
  actionsQueue: ActionName[],
  setExecuteAction: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    if (actionsQueue.length === 0) return;

    const timer = setTimeout(() => {
      setExecuteAction(true);
    }, EXECUTION_INTERVAL);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionsQueue]);
}
