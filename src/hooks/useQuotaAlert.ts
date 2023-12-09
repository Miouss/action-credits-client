import { useEffect, useState } from "react";
import { QUOTA_ALERT_DELAY } from "../config/misc";

export function useQuotaAlert(id: string) {
  const [hasRefreshedCredits, setHasRefreshedCredits] = useState<boolean>();

  useEffect(() => {
    if (!id) return;
    setHasRefreshedCredits(true);
    setTimeout(() => {
      setHasRefreshedCredits(false);
    }, QUOTA_ALERT_DELAY);
  }, [id]);

  return hasRefreshedCredits;
}
