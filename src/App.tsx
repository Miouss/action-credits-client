import { useState } from "react";
import { ActionsAvailable, ActionsQueue } from "./components";
import { QueueItem } from "./types/types";

function App() {
  const [actionsQueue, setActionsQueue] = useState<QueueItem[]>([]);

  return (
    <>
      <header>Gestionnaire de tâches</header>
      <main>
        <ActionsAvailable setActionsQueue={setActionsQueue} />
        <ActionsQueue actionsQueue={actionsQueue} />
      </main>
    </>
  );
}

export default App;
