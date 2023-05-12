import { AvailableGame } from "@/services/infoService";
import { useEffect, useState } from "react";

// Custom hook for fetching available games
export const useAvailableGames = () => {
  const [availableGames, setAvailableGames] = useState<AvailableGame[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/info/games")
      .then((res) => res.json())
      .then((data) => setAvailableGames(data))
      .finally(() => setLoading(false));
  }, []);

  return { availableGames, loading };
};
