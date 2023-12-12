import { useState } from "react";
import { ActionsAvailable, DisplayQueue } from "./components";
import { QueueFilteredByActionStatus } from "./types/types";
import { ActionStatus } from "./types/enums";

function App() {
  const [queue, setQueue] = useState<QueueFilteredByActionStatus>();

  return (
    <>
      <header>Gestionnaire de tâches</header>
      <main>
        <ActionsAvailable setQueue={setQueue} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {queue && (
            <>
              <DisplayQueue
                queueItems={queue.items.pending}
                queueItemsHistory={queue.pendingItemsHistory}
                queueType={ActionStatus.PENDING}
              />
              <DisplayQueue
                queueItems={queue.items.executed}
                queueItemsHistory={queue.executedItemsHistory}
                queueType={ActionStatus.COMPLETED}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
