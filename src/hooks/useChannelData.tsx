import { Channel } from "@/services/channelService";
import { useEffect, useState } from "react";

export type Game = {
  id: string;
  name: string;
};

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
  };
};
