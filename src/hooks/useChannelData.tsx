import { Channel } from "@/repo/channelRepository";
import { useEffect, useState } from "react";

export const useChannel = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [initialChannel, setInitialChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(false);

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

  const saveChannel = (onSave?: () => void) => {
    setLoading(true);
    fetch("/api/channel", { method: "PUT", body: JSON.stringify(channel) })
      .then((res) => res.json().catch((err) => console.log(err)))
      .then((data) => {
        let updatedChannel = data as Channel;
        setChannel({ ...updatedChannel });

        if (onSave) onSave(); // Figure out if this should be called from here or finally
      })
      .finally(() => setLoading(false));
  };

  const restoreChannel = () => {
    if (!channel || !initialChannel) return;

    setChannel({ ...initialChannel });
  };

  const modified = JSON.stringify(channel) != JSON.stringify(initialChannel);

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
