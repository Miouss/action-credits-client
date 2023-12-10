import { useState, useEffect } from "react";
import { RequestFactory } from "../utils/requests";

export function useRefreshInterval() {
  const [refreshInterval, setRefreshInterval] = useState({
    execution: 0,
    credits: 0,
  });

  useEffect(() => {
    async function fetchRefreshInterval() {
      const response = await RequestFactory().userActions.refreshInterval.get();
      const data = await response.json();

      setRefreshInterval(data);
    }

    fetchRefreshInterval();
  }, []);

  return refreshInterval;
}
