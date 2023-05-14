import { MongoId, getCollection } from "@/lib/repo";
import { AvailableGame, Language } from "@/services/infoService";
import { ObjectId } from "mongodb";

const CHANNELS = "channels";

export type Channel = {
  _id: ObjectId;
  userId: ObjectId;
  enableUploads: boolean;
  games: AvailableGame[];
  date: string;
  languages: Language[];
  videoAmount: number;
  titleTemplate: string;
};

class ChannelRepository {
  /**
   * @returns Default channel with random _id and invalid userId (should change before saving)
   */
  getDefaultChannel(): Channel {
    return {
      _id: new ObjectId(),
      date: new Date().toISOString(),
      enableUploads: false,
      games: [],
      languages: [],
      titleTemplate: "",
      userId: new ObjectId(),
      videoAmount: 0,
    };
  }

  async findByUserId(userId: MongoId): Promise<Channel | null> {
    const collection = await getCollection<Channel>(CHANNELS);

    return await collection.findOne({ userId: new ObjectId(userId) });
  }

  async save(channel: Channel): Promise<Channel> {
    const collection = await getCollection<Channel>(CHANNELS);

    channel._id = new ObjectId(channel._id);
    channel.userId = new ObjectId(channel.userId);
    channel.games = channel.games.map((game) => ({
      ...game,
      _id: new ObjectId(game._id),
    }));
    channel.languages = channel.languages.map((language) => ({
      ...language,
      _id: new ObjectId(language._id),
    }));

    const result = await collection.replaceOne({ _id: channel._id }, channel, {
      upsert: true,
    });

    const created = await collection.findOne({
      _id: result.upsertedId ?? channel._id,
    });
    if (!created) throw Error(JSON.stringify(result));

    return created;
  }
}

export default new ChannelRepository();
