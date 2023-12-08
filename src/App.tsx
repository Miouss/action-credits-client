import { useState } from "react";
import { ActionName } from "./enums";
import { ActionsAvailable } from "./components/ActionsAvailable";
import { ActionsQueue } from "./components/ActionsQueue";

function App() {
  const [actionsQueue, setActionsQueue] = useState<ActionName[]>([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActionsAvailable
        actionsQueue={actionsQueue}
        setActionsQueue={setActionsQueue}
      />

      <ActionsQueue actionsQueue={actionsQueue} />
    </div>
  );
}

export default App;
