import { MongoId, getCollection } from "@/lib/repo";
import { ObjectId } from "mongodb";

const GAMES = "games";

export type AvailableGame = {
  _id: ObjectId;
  id: string; // twitch game id
  name: string;
  box_art_url: string; // fill width x height with 1x3 aspect ratio
  igdb_id: string;
};

const infoService = {
  async getAvailableGames(): Promise<AvailableGame[]> {
    let collection = await getCollection<AvailableGame>(GAMES);

    let games = collection.find();
    let arr = await games.toArray();

    return arr;
  },
};

export default infoService;
