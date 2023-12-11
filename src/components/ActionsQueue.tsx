import { useState } from "react";
import { ActionStatus } from "../types/enums";
import { QueueItem } from "../types/types";

interface Props {
  actionsQueue: QueueItem[];
  nbActionsLeft: number;
  nbActionsDone: number;
}

export function ActionsQueue({
  actionsQueue,
  nbActionsLeft,
  nbActionsDone,
}: Props) {
  const hasActionsQueue = actionsQueue && actionsQueue.length > 0;

  const [filter, setFilter] = useState(false);

  if (!hasActionsQueue)
    return (
      <section>
        <h3>Aucune Actions en attente</h3>
      </section>
    );



  const totalNbActionsDone = filter
    ? nbActionsDone + actionsQueue.filter(({ status }) => status === ActionStatus.COMPLETED).length
    : nbActionsDone;

  const s1 = plural(totalNbActionsDone);
  const s2 = plural(nbActionsLeft);

  const nextClass = ["next"]; // hacky way to add the "next" class to the first element with the class "pending" thanks to pop() method$

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h3>Actions en attente</h3>
        <div className="switch-container">
          <span className="label">Cacher les actions éxécutées</span>

          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => setFilter(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <ul className="queue">
        {totalNbActionsDone > 0 && (
          <li>
            <span className="history">
              +{totalNbActionsDone} action{s1} déjà exécutée{s1}
            </span>
            <ActionSeparator />
          </li>
        )}
        {hasActionsQueue &&
          actionsQueue.map(({ name, status }, index) => {
            if (filter && status === ActionStatus.COMPLETED) return null;

            const statusClass =
              status === ActionStatus.PENDING
                ? `pending ${nextClass.pop()}`
                : "completed";

            return (
              <li key={index}>
                <span className={statusClass}>{name}</span>
                <ActionSeparator />
              </li>
            );
          })}
        <li>
          {nbActionsLeft > 0 ? (
            <span className="history">
              +{nbActionsLeft} action{s2} en attente d'éxécution
            </span>
          ) : (
            <span className="history">Prochaine action ajoutée</span>
          )}
        </li>
      </ul>
    </section>
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
