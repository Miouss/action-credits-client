import { useEffect, useState } from "react";

export function useQuotaAlert(id: string) {
  const [hasRefreshedCredits, setHasRefreshedCredits] = useState<boolean>();

  useEffect(() => {
    if (!id) return;

    setHasRefreshedCredits(true);
    setTimeout(() => {
      setHasRefreshedCredits(false);
    }, 6000);
  }, [id]);

  return hasRefreshedCredits;
}
