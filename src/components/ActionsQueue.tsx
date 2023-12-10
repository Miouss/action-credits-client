import { ActionStatus } from "../types/enums";
import { QueueItem } from "../types/types";

interface Props {
  actionsQueue?: QueueItem[];
}

export function ActionsQueue({ actionsQueue }: Props) {
  const hasActionsQueue = actionsQueue && actionsQueue.length > 0;

  if (!hasActionsQueue)
    return (
      <section>
        <h3>Aucune Actions en attente</h3>
      </section>
    );

  return (
    <section>
      <h3>Actions en attente</h3>
      <ul className="queue">
        {hasActionsQueue &&
          actionsQueue.map(({ name, status }, index) => (
            <li key={index}>
              <span
                className={
                  status === ActionStatus.PENDING ? "pending" : "completed"
                }
              >
                {name}
              </span>
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291zm-7.564.289h5.446l-2.718 3.522z"
                  fillRule="nonzero"
                />
              </svg>
            </li>
          ))}
        <li>
          <span>Prochaine action ajoutée</span>
        </li>
      </ul>
    </section>
  );
}
