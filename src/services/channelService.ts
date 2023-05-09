import { Account } from "next-auth";
import infoService, { AvailableGame } from "./infoService";

export type Channel = {
  games: AvailableGame[];
  date: string;
};

const channelService = {
  async getChannel(account: Account): Promise<Channel> {
    let availableGames = await infoService.getAvailableGames();
    return { date: new Date().toJSON(), games: availableGames.splice(0, 5) };
  },
};

export default channelService;
