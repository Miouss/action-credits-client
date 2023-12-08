import { useState } from "react";
import { ActionName } from "./enums";
import { ActionsAvailable } from "./components/ActionsAvailable";
import { ActionsQueue } from "./components/ActionsQueue";

function App() {
  const [actionsQueue, setActionsQueue] = useState<ActionName[]>([]);

  return (
    <>
      <ActionsAvailable
        actionsQueue={actionsQueue}
        setActionsQueue={setActionsQueue}
      />

      <ActionsQueue actionsQueue={actionsQueue} />
    </>
  );
}

export default App;
