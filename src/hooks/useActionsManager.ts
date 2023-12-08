import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, UserActions } from "../types";
import { ActionName } from "../enums";
import { DEFAULT_USER } from "../config";

const API_ACTIONS = "http://localhost:3001/api/actions";
const API_ACTIONS_QUEUE = API_ACTIONS + "/queue";

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
        const res = await fetch(API_ACTIONS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: DEFAULT_USER }),
        });

        if (!res.ok) throw await res.text();

        const data: UserActions = await res.json();
        setActions(data.actions);
      };

      getActions();
    } catch (err) {
      alert(err);
    }
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
        const res = await fetch(API_ACTIONS_QUEUE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: DEFAULT_USER,
            actionName: actionsQueue[0],
          }),
        });

        if (!res.ok) throw await res.text();

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
  }, [actionsQueue]);
}
