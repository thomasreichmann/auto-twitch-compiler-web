import { getCollection } from "@/lib/repo";
import { ObjectId } from "mongodb";

const GAMES = "games";
const LANGUAGES = "languages";

export type AvailableGame = {
  _id: ObjectId;
  id: string; // twitch game id
  name: string;
  box_art_url: string; // fill width x height with 1x3 aspect ratio
  igdb_id: string;
};

export type Language = {
  _id: ObjectId;
  code: String;
  name: String;
  native: String;
};

const infoService = {
  async getAvailableGames(): Promise<AvailableGame[]> {
    let collection = await getCollection<AvailableGame>(GAMES);

    let games = collection.find();

    return games.toArray();
  },

  async getLanguages(): Promise<Language[]> {
    let collection = await getCollection<Language>(LANGUAGES);

    let languages = collection.find();

    return languages.toArray();
  },
};

export default infoService;
