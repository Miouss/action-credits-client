import { ActionName } from "../types/enums";
import { Action } from "../types/types";

interface Props {
  queueItems: ActionName[];
  actions: Action[];
  queueItemsHistory?: number;
}

export function DisplayQueue({
  queueItems,
  actions,
  queueItemsHistory,
}: Props) {
  const hasActionsQueue = queueItems && queueItems.length > 0;
  const isExecutedQueue = Boolean(queueItemsHistory);

  const queueState = isExecutedQueue ? "exécuté" : "en attente";
  const statusClass = isExecutedQueue ? "completed" : "pending";

  const validActions = actions.map(
    (action) => action.credits > 0 && action.name
  );

  if (!hasActionsQueue)
    return (
      <section>
        <h3>Aucune Action {queueState}</h3>
      </section>
    );

  return (
    <section>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        {isExecutedQueue && "Dernières"} Actions {queueState}
        {isExecutedQueue && "s"}
      </h3>

      <ul className="queue">
        {isExecutedQueue && <History queueItemsHistory={queueItemsHistory!} />}
        {hasActionsQueue &&
          queueItems.map((name, index) => (
            <li key={index}>
              <span
                className={
                  isExecutedQueue
                    ? statusClass
                    : validActions.includes(name)
                    ? "pending"
                    : "unexecutable"
                }
              >
                {name}
              </span>
              {index < queueItems.length - 1 && <ActionSeparator />}
            </li>
          ))}
      </ul>
    </section>
  );
}

function History({ queueItemsHistory }: { queueItemsHistory: number }) {
  if (queueItemsHistory === 0) return null;

  const s = plural(queueItemsHistory);

  return (
    <li>
      <span className="history">
        +{queueItemsHistory} action{s} exécutée{s}
      </span>
      {<ActionSeparator />}
    </li>
  );
}

function ActionSeparator() {
  return (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291zm-7.564.289h5.446l-2.718 3.522z" />
    </svg>
  );
}

function plural(number: number) {
  return number > 1 ? "s" : "";
}
