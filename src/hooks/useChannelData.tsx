import { Channel } from "@/services/channelService";
import { Language } from "@/services/infoService";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

export type Game = {
  id: string;
  name: string;
};

export const useChannelData = () => {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/channel")
      .then((res) => res.json())
      .then((data) => {
        let channel = data as Channel;
        setSelectedGames(channel.games);
        setTime(dayjs(channel.date));
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    selectedGames,
    setSelectedGames,
    time,
    setTime,
    selectedLanguages,
    setSelectedLanguages,
    loading,
  };
};
