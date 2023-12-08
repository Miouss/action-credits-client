import { ActionName } from "../enums";

interface Props {
  actionsQueue?: ActionName[];
}

export function ActionsQueue({ actionsQueue }: Props) {
  const hasActionsQueue = actionsQueue && actionsQueue.length > 0;

  if (!hasActionsQueue) return null;

  return (
    <>
      <h3>Actions en attente</h3>
      <ul>
        {hasActionsQueue &&
          actionsQueue.map((action, index) => <li key={index}>{action}</li>)}
      </ul>
    </>
  );
}
