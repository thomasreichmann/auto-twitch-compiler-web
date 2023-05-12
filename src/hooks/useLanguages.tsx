import { Language } from "@/services/infoService";
import { useEffect, useState } from "react";

export type OptionLanguage = Language & {
  id: string;
};

// Custom hook for fetching available games
export const useLanguages = () => {
  const [languages, setLanguages] = useState<OptionLanguage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/info/languages")
      .then((res) => res.json())
      .then((data) =>
        setLanguages(
          data.map((lang: { id: string; code: string }) => {
            lang.id = lang.code;
            return lang;
          })
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return { languages, loading };
};
