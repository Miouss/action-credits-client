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
  const [id, setId] = useState<string>("");
  const [actions, setActions] = useState<Action[]>();
  const [executeAction, setExecuteAction] = useState(false);
  const [hasRefreshedCredits, setHasRefreshedCredits] = useState(false);

  useActionsAvailable(setActions, setId);

  useExecutionHandler(
    actionsQueue,
    setActionsQueue,
    executeAction,
    setExecuteAction,
    setHasRefreshedCredits,
    id,
    setId,
    setActions
  );

  useExecutionInterval(actionsQueue, setExecuteAction);

  return {
    hasRefreshedCredits,
    actions,
  };
}

function useActionsAvailable(
  setActions: Dispatch<SetStateAction<Action[] | undefined>>,
  setId: Dispatch<SetStateAction<string>>
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
        setId(data.id);
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
  executeAction: boolean,
  setExecuteAction: Dispatch<SetStateAction<boolean>>,
  setHasRefreshedCredits: Dispatch<SetStateAction<boolean>>,
  id: string,
  setId: Dispatch<SetStateAction<string>>,
  setActions: Dispatch<SetStateAction<Action[] | undefined>>
) {
  useEffect(() => {
    if (!executeAction) return;

    const handleExecuteAction = async () => {
      try {
        const res = await requestActionsQueue(
          localStorage.getItem("token") ?? "",
          actionsQueue[0]
        );
        const { actions: newActions, id: newId }: UserActions =
          await res.json();

        setActionsQueue((actionsQueue) => actionsQueue.slice(1));
        setActions(newActions);

        if (newId !== id) {
          setId(newId);
          setHasRefreshedCredits(true);
          setTimeout(() => {
            setHasRefreshedCredits(false);
          }, 7000);
        }
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
