import { Channel } from "@/repo/channelRepository";
import { useEffect, useState } from "react";

export const useChannel = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [initialChannel, setInitialChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(false);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/channel")
      .then((res) => res.json())
      .then((data) => {
        let channel = data as Channel;
        setChannel(channel);
        setInitialChannel(channel);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setModified(JSON.stringify(channel) != JSON.stringify(initialChannel));
  }, [channel]);

  const saveChannel = (onSave: (err?: Error) => void = () => {}) => {
    setLoading(true);
    fetch("/api/channel", { method: "PUT", body: JSON.stringify(channel) })
      .then(async (res) => {
        if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);

        return res.json();
      })
      .then((data) => {
        let updatedChannel = data as Channel;
        setChannel({ ...updatedChannel });
        setInitialChannel({ ...updatedChannel });
        setModified(false);

        onSave();
      })
      .catch((err: Error) => onSave(err))
      .finally(() => setLoading(false));
  };

  const restoreChannel = () => {
    if (!channel || !initialChannel) return;

    setChannel({ ...initialChannel });
  };

  return {
    channel,
    setChannel,
    initialChannel,
    loading,
    modified,
    restoreChannel,
    saveChannel,
  };
};
