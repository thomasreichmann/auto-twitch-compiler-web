import accountRepository from "@/repo/accountRepository";
import channelRepository, { Channel } from "@/repo/channelRepository";
import { VideoProcessingPayload, VideoProcessingSettings } from "@/types/CreateScheduleRequest";
import { ObjectId } from "mongodb";

const channelService = {
  async getChannel(userId: string): Promise<Channel> {
    let channel = await channelRepository.findByUserId(userId ?? "");

    // If we found the user's channel, return it
    if (channel) return channel;

    // If the user doesn't have a channel, create one.
    channel = channelRepository.getDefaultChannel();
    channel.userId = new ObjectId(userId);

    return channelRepository.save(channel);
  },

  async saveChannel(channel: Channel): Promise<Channel> {
    return channelRepository.save(channel);
  },

  async getSchedulePayload(channel: Channel): Promise<VideoProcessingPayload> {
    const account = await accountRepository.findByUserId(channel.userId);

    if (!account?.refresh_token) throw new Error("No refresh token found for user");
    if (!account?.userId) throw new Error("No userId found for user account");

    const processingSettings: VideoProcessingSettings = {
      videoCodec: "libx264",
      videoBitrate: "6000",
      videoPreset: "ultrafast",
    };

    return {
      auth: {
        refreshToken: account?.refresh_token,
        userId: account.userId,
      },
      bucket: process.env.BUCKET_NAME!,
      gameIds: channel.games.map((game) => game.id),
      languages: channel.languages.map((language) => language.code),
      quantity: channel.videoAmount,
      titleTemplate: channel.titleTemplate,
      concatenateSettings: processingSettings,
      preProcessSettings: processingSettings,
      privacyStatus: channel.private ? "private" : "public",
    };
  },
};

export default channelService;
