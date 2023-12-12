import { ActionStatus, ActionName } from "../types/enums";

interface Props {
  queueItems: ActionName[];
  queueItemsHistory: number;
  queueType: ActionStatus;
}

export function DisplayQueue({
  queueItems,
  queueItemsHistory,
  queueType,
}: Props) {
  const hasActionsQueue = queueItems && queueItems.length > 0;
  const queueState =
    queueType === ActionStatus.PENDING ? "en attente" : "exécuté";
  const statusClass =
    queueType === ActionStatus.PENDING ? "pending" : "completed";

  if (!hasActionsQueue)
    return (
      <section>
        <h3>Aucune Actions {queueState}</h3>
      </section>
    );

  const History = () => (
    <HistoryType queueItemsHistory={queueItemsHistory} queueType={queueType} />
  );

  return (
    <section>
        <h3
          style={{
            textAlign: "center",
          }}
        >
          Actions {queueState}
        </h3>

      <ul className="queue">
        {queueType === ActionStatus.COMPLETED && <History />}
        {hasActionsQueue &&
          queueItems.map((name, index) => (
            <li key={index}>
              <span className={statusClass}>{name}</span>
              {queueItems.length - 1 != index && <ActionSeparator />}
            </li>
          ))}

        {queueType === ActionStatus.PENDING && <History />}
      </ul>
    </section>
  );
}

function HistoryType({
  queueItemsHistory,
  queueType,
}: {
  queueItemsHistory: number;
  queueType: ActionStatus;
}) {
  const s = plural(queueItemsHistory);
  const isExecutedHistory = queueType === ActionStatus.COMPLETED;

  return (
    <li>
      {!isExecutedHistory && <ActionSeparator />}
      <span className="history">
        +{queueItemsHistory} action{s}{" "}
        {queueType === ActionStatus.PENDING ? "en attente" : `exécutée${s}`}
      </span>
      {isExecutedHistory && <ActionSeparator />}
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
