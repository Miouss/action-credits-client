import { Dispatch, useState } from "react";
import { Action } from "../types/types";
import { ActionName } from "../types/enums";
import {
  useUpToDateUserActions,
  useAddActionToQueue,
  useQuotaAlert,
} from "../hooks";

interface Props {
  setActionsQueue: Dispatch<React.SetStateAction<ActionName[]>>;
}

export function ActionsAvailable({ setActionsQueue }: Props) {
  const [newAction, setNewAction] = useState<ActionName>();
  const [id, setId] = useState<string>("");

  const { actions, executionInterval, refreshCreditsInterval } =
    useUpToDateUserActions(setActionsQueue, setId);
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
      {executionInterval && (
        <p>Action exécuté toutes les {executionInterval / 1000}s</p>
      )}
      {refreshCreditsInterval && (
        <p>Quota des crédits actualisés toutes les {refreshCreditsInterval / 1000}s, si au moins 1 crédit a été utilisé</p>
      )}
    </section>
  );
}

interface ActionItemProps extends Action {
  newAction: ActionName | undefined;
  setNewAction: Dispatch<React.SetStateAction<ActionName | undefined>>;
}

function ActionItem({
  name,
  credits,
  newAction,
  setNewAction,
}: ActionItemProps) {
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
      <button onClick={handleClick} disabled={newAction !== undefined}>
        Ajouter
      </button>
    </li>
  );
}
