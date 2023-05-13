import { Account } from "next-auth";
import infoService, { AvailableGame, Language } from "./infoService";

export type Channel = {
  games: AvailableGame[];
  date: string;
  languages: Language[];
  videoAmount: number;
};

const channelService = {
  async getChannel(account: Account): Promise<Channel> {
    let availableGames = await infoService.getAvailableGames();
    let languages = await infoService.getLanguages();
    return {
      date: new Date().toJSON(),
      games: availableGames.splice(0, 5),
      languages: languages.splice(14, 3),
      videoAmount: 2,
    };
  },
};

export default channelService;
