import { Upload } from "@/services/uploadsService";
import { useCallback, useEffect, useState } from "react";

export const useUploads = () => {
  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState<Upload[]>([]);

  const fetchUploads = useCallback(() => {
    setLoading(true);
    fetch("api/uploads")
      .then((res) => res.json())
      .then((data) => {
        setUploads(data as Upload[]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  const reloadUploads = () => {
    fetchUploads();
  };

  return { loading, uploads, reloadUploads };
};
