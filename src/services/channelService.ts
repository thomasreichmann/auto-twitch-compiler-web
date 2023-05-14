import channelRepository, { Channel } from "@/repo/channelRepository";
import { ObjectId } from "mongodb";
import { Account } from "next-auth";

const channelService = {
  async getChannel(account: Account): Promise<Channel> {
    let channel = await channelRepository.findByUserId(account.userId ?? "");

    // If we found the user's channel, return it
    if (channel) return channel;

    // If the user doesn't have a channel, create one.
    channel = channelRepository.getDefaultChannel();
    channel.userId = new ObjectId(account.userId);

    return channelRepository.save(channel);
  },

  async saveChannel(channel: Channel): Promise<Channel> {
    return channelRepository.save(channel);
  },
};

export default channelService;
