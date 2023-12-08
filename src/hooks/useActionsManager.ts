import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, UserActions } from "../types";
import { ActionName } from "../enums";
import { DEFAULT_USER } from "../config";
import { requestActions, requestActionsQueue } from "../utils/requests";

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
        const res = await requestActions(DEFAULT_USER);
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
        await requestActionsQueue(DEFAULT_USER, actionsQueue[0]);

        setActionsQueue((actionsQueue) => actionsQueue.slice(1));
        setActions((actions) =>
          actions?.map((action) =>
            action.name === actionsQueue[0]
              ? Object.assign(action, {
                  credits: action.credits - 1,
                })
              : action
          )
        );
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
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionsQueue]);
}
