import { Dispatch, SetStateAction, useEffect, useState } from "react";

enum ActionName {
  INVIT = "Inviter",
  VISIT = "Visiter",
  MESSAGE = "Message",
}

function App() {
  const { INVIT, VISIT, MESSAGE } = ActionName;
  const [update, setUpdate] = useState(false);
  const [credits, setCredits] = useState(
    new Map<string, number>([
      [INVIT, 2],
      [VISIT, 20],
      [MESSAGE, 40],
    ])
  );
  const [actions, setActions] = useState<ActionName[]>([]);

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/consume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credits: credits.get(actions[0])!,
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      setUpdate(true);
    } catch (e: unknown) {
      alert((e as Error).message);
    }
  };

  useEffect(() => {
    if (!update || actions.length === 0) return;

    setActions((actions) => actions.slice(1));

    setCredits((credits) => {
      const newCredits = new Map(credits);

      newCredits.set(actions[0], newCredits.get(actions[0])! - 1);

      return newCredits;
    });

    setUpdate(false);
  }, [update]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Actions Possible</h3>
        <ul>
          <AddActionBtn
            action={INVIT}
            amount={credits.get(INVIT)!}
            setActions={setActions}
          />
          <AddActionBtn
            action={VISIT}
            amount={credits.get(VISIT)!}
            setActions={setActions}
          />
          <AddActionBtn
            action={MESSAGE}
            amount={credits.get(MESSAGE)!}
            setActions={setActions}
          />
        </ul>
        <h3>Actions en attente</h3>
        <ul>
          {actions.map((action, index) => (
            <li
              key={index}
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{action}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleClick}>CONSUME !</button>
      </div>
    </>
  );
}

interface AddActionBtnProps {
  action: ActionName;
  amount: number;
  setActions: Dispatch<SetStateAction<ActionName[]>>;
}

function AddActionBtn({ action, amount, setActions }: AddActionBtnProps) {
  const handleClick = () => {
    setActions((actions) => [action, ...actions]);
  };

  return (
    <li
      style={{
        width: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span>{action}</span>
      <span>{amount}</span>
      <button onClick={handleClick}>Add</button>
    </li>
  );
}

export default App;
