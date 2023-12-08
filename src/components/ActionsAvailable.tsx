import { Dispatch } from "react";
import { Action } from "../types";
import { ActionName } from "../enums";
import { useActionsManager } from "../hooks/useActionsManager";

interface Props {
  actionsQueue: ActionName[];
  setActionsQueue: Dispatch<React.SetStateAction<ActionName[]>>;
}

export function ActionsAvailable({ actionsQueue, setActionsQueue }: Props) {
  const actions = useActionsManager(actionsQueue, setActionsQueue);
  const hasActions = actions && actions.length > 0;
  if (!hasActions) return null;

  return (
    <section>
      <h3>Actions Possible</h3>
      <ul>
        {hasActions &&
          actions.map(({ name, credits }) => (
            <ActionItem
              key={name}
              name={name}
              credits={credits}
              setActionsQueue={setActionsQueue}
            />
          ))}
      </ul>
    </section>
  );
}

interface AddActionBtnProps extends Action {
  setActionsQueue: Dispatch<React.SetStateAction<ActionName[]>>;
}

function ActionItem({ name, credits, setActionsQueue }: AddActionBtnProps) {
  const handleClick = () => {
    setActionsQueue((actionsQueue) => [...actionsQueue, name]);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span style={{ flex: "1" }}>{name}</span>
      <span>
        {credits} <span style={{ fontSize: "0.9rem" }}>restant{credits > 1 && "s"}</span>
      </span>
      <button onClick={handleClick}>Ajouter</button>
    </li>
  );
}
