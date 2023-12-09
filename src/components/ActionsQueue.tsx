import { ActionName } from "../types/enums";

interface Props {
  actionsQueue?: ActionName[];
}

export function ActionsQueue({ actionsQueue }: Props) {
  const hasActionsQueue = actionsQueue && actionsQueue.length > 0;


  if (!hasActionsQueue) return <h3>Aucune Actions en attente</h3>;

  return (
    <section>
      <h3>Actions en attente</h3>
      <ul>
        {hasActionsQueue &&
          actionsQueue.map((action, index) => <li key={index}>{action}</li>)}
      </ul>
    </section>
  );
}
