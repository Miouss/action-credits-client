import { Dispatch, useState } from "react";
import { Action } from "../types";
import { ActionName } from "../enums";
import { useActionsManager } from "../hooks/useActionsManager";
import { useAddActionToQueue } from "../hooks/useAddActionToQueue";
import { useQuotaAlert } from "../hooks/useQuotaAlert";

interface Props {
  setActionsQueue: Dispatch<React.SetStateAction<ActionName[]>>;
}

export function ActionsAvailable({ setActionsQueue }: Props) {
  const [newAction, setNewAction] = useState<ActionName>();
  const [id, setId] = useState<string>("");

  const actions = useActionsManager(setActionsQueue, setId);
  const hasRefreshedCredits = useQuotaAlert(id);

  useAddActionToQueue(newAction, setNewAction);

  const hasActions = actions && actions.length > 0;
  if (!hasActions)
    return <h1>Impossible de charger les actions depuis le serveur</h1>;

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
              newAction={newAction}
              setNewAction={setNewAction}
            />
          ))}
      </ul>
      {hasRefreshedCredits && <p>Le quota des crédits a été actualisé</p>}
    </section>
  );
}

interface ActionItemProps extends Action {
  newAction: ActionName | undefined;
  setNewAction: Dispatch<React.SetStateAction<ActionName | undefined>>;
}

function ActionItem({ name, credits, newAction, setNewAction }: ActionItemProps) {
  const handleClick = () => {
    setNewAction(name);
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
        {credits}{" "}
        <span style={{ fontSize: "0.9rem" }}>restant{credits > 1 && "s"}</span>
      </span>
      <button onClick={handleClick} disabled={newAction !== undefined}>Ajouter</button>
    </li>
  );
}
