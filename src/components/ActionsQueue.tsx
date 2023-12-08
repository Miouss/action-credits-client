import { ActionName } from "../enums";
import { useCountdown } from "../hooks/useCountdown";

interface Props {
  actionsQueue?: ActionName[];
}

export function ActionsQueue({ actionsQueue }: Props) {
  const hasActionsQueue = actionsQueue && actionsQueue.length > 0;

  const countdown = useCountdown(actionsQueue);

  if (!hasActionsQueue) return <h3>Aucune Actions en attente</h3>;

  return (
    <section>
      <h3>Actions en attente</h3>
      <h4>Prochaine action dans {countdown} secondes</h4>
      <ul>
        {hasActionsQueue &&
          actionsQueue.map((action, index) => <li key={index}>{action}</li>)}
      </ul>
    </section>
  );
}
