import { Dispatch, useState } from "react";
import { Action, QueueItem } from "../types/types";
import { ActionName } from "../types/enums";
import {
  useUpToDateUserActions,
  useAddActionToQueue,
  useQuotaAlert,
} from "../hooks";
import { useRefreshInterval } from "../hooks/useRefreshInterval";

interface Props {
  setActionsQueue: Dispatch<React.SetStateAction<QueueItem[]>>;
}

export function ActionsAvailable({ setActionsQueue }: Props) {
  const [newAction, setNewAction] = useState<ActionName>();
  const [id, setId] = useState<string>("");

  const actions = useUpToDateUserActions(setActionsQueue, setId);
  const hasRefreshedCredits = useQuotaAlert(id);

  const refreshInterval = useRefreshInterval();
  useAddActionToQueue(newAction, setNewAction, setActionsQueue);

  const hasActions = actions && actions.length > 0;
  if (!hasActions)
    return <h1>Impossible de charger les actions depuis le serveur</h1>;

  return (
    <section>
      <h3>Actions Possible</h3>
      <div className="actions-config">
        <table className="actions-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Credits restants</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
        <div>
          {hasRefreshedCredits && <p>Le quota des crédits a été actualisé</p>}
          {refreshInterval.execution && (
            <p>
              Une action sera exécutée toutes les{" "}
              {refreshInterval.execution / 1000}s
            </p>
          )}
          {refreshInterval.credits && (
            <p>
              Quota des crédits actualisés toutes les{" "}
              {refreshInterval.credits / 1000}s, si au moins 1 crédit a été
              utilisé
            </p>
          )}
        </div>
      </div>
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
    <tr>
      <td>{name}</td>
      <td>{credits}</td>
      <td>
        <button
          className="add-button"
          onClick={handleClick}
          disabled={newAction !== undefined}
        >
          Ajouter
        </button>
      </td>
    </tr>
  );
}
