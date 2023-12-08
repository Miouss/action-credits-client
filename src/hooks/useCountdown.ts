import { useEffect, useState } from "react";
import { EXECUTION_INTERVAL } from "../config";
import { ActionName } from "../enums";

export function useCountdown(actionsQueue?: ActionName[]) {
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    setCountdown(EXECUTION_INTERVAL / 1000);

    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [actionsQueue]);

  return countdown;
}
