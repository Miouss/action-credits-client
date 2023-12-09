import { useState } from "react";
import { ActionName } from "./types/enums";
import { ActionsAvailable } from "./components/ActionsAvailable";
import { ActionsQueue } from "./components/ActionsQueue";

function App() {
  const [actionsQueue, setActionsQueue] = useState<ActionName[]>([]);

  return (
    <>
      <ActionsAvailable setActionsQueue={setActionsQueue} />

      <ActionsQueue
        actionsQueue={actionsQueue}
      />
    </>
  );
}

export default App;
