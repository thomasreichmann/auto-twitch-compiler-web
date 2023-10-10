export default interface CreateScheduleRequest {
  name?: string;
  time: ScheduleTime;
  state: "ENABLED" | "DISABLED";
  payload: any;
}

export interface ScheduleTime {
  hours: string;
  minutes: string;
}

export interface VideoProcessingPayload {
  // Quantity of clips to fetch
  quantity: number;
  // Twitch category ids to fetch from (divided equally between number of clips)
  gameIds: string[];

  bucket: string;

  // Youtube user OAuth + internal userid
  auth: {
    userId: string;
    refreshToken: string;
  };

  languages: string[];
  titleTemplate: string;
  privacyStatus: "public" | "private";

  preProcessSettings: VideoProcessingSettings;
  concatenateSettings: VideoProcessingSettings;
}

export interface VideoProcessingSettings {
  videoCodec: FFmpegVideoCodec;
  videoBitrate: string;
  videoPreset: FFmpegVideoPreset;
}

type FFmpegVideoCodec =
  | "libx264"
  | "libx265"
  | "libvpx"
  | "libvpx-vp9"
  | "libaom-av1"
  | "mpeg4"
  | "libxvid"
  | "vp8"
  | "vp9"
  | "av1"
  | "flv";

type FFmpegVideoPreset =
  | "ultrafast"
  | "superfast"
  | "veryfast"
  | "faster"
  | "fast"
  | "medium"
  | "slow"
  | "slower"
  | "veryslow"
  | "placebo";
