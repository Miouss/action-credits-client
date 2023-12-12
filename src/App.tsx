import { useState } from "react";
import { ActionsAvailable, DisplayQueue } from "./components";
import { Action, QueueFilteredByActionStatus } from "./types/types";

function App() {
  const [queue, setQueue] = useState<QueueFilteredByActionStatus>();
  const [actions, setActions] = useState<Action[]>();

  return (
    <>
      <header>Gestionnaire de tâches</header>
      <main>
        <ActionsAvailable
          setQueue={setQueue}
          actions={actions}
          setActions={setActions}
        />
        {queue && actions && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <>
              <DisplayQueue
                queueItems={queue.items.pending}
                actions={actions}
              />
              <DisplayQueue
                queueItems={queue.items.executed}
                actions={actions}
                queueItemsHistory={queue.executedItemsHistory}
              />
            </>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
