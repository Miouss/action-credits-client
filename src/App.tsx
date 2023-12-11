import { useState } from "react";
import { ActionsAvailable, ActionsQueue } from "./components";
import { QueueItem } from "./types/types";

function App() {
  const [actionsQueue, setActionsQueue] = useState<QueueItem[]>([]);
  const [nbActionsLeft, setNbActionsLeft] = useState<number>(0);

  return (
    <>
      <header>Gestionnaire de tâches</header>
      <main>
        <ActionsAvailable
          setActionsQueue={setActionsQueue}
          setNbActionsLeft={setNbActionsLeft}
        />
        <ActionsQueue
          actionsQueue={actionsQueue}
          nbActionsLeft={nbActionsLeft}
        />
      </main>
    </>
  );
}

export default App;
