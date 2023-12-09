import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Action, UserActions } from "../types";
import { DEFAULT_USER, EXECUTION_INTERVAL } from "../config";
import { requestUserActions, requestToken } from "../utils/requests";
import { ActionName } from "../enums";

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
        const getActions = async () => {
          const res = await requestToken(DEFAULT_USER);
          const { token } = await res.json();
          localStorage.setItem("token", token);

          const res2 = await requestUserActions(token);
          const data: UserActions = await res2.json();

          setActions(data.actions);
          setActionsQueue(data.queue);
          setId(data.id);
        };

        getActions();
      } catch (err) {
        alert(err);
      }
    };

    getUserActions();
    
    setInterval(async () => {
      await getUserActions();
    }, EXECUTION_INTERVAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
