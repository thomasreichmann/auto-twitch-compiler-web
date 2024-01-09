import { MongoId } from "@/lib/repo";

export interface Upload {
  _id: MongoId;
  channelId: MongoId;
  title: string;
  uploadDate: Date;
  thumbnailUrl: string;
  clips: Clip[];
  processingDetails: ProcessingDetails;
}

export interface ProcessingDetails {
  curateTime: number;
  downloadTime: number;
  preProcessTime: number;
  concatenateTime: number;
  generateMetadataTime: number;
  uploadYoutubeTime: number;
}

export interface Clip {
  title: string;
  creatorName: string;
  creatorUrl: string;
  downloadUrl: string;
  originalUrl: string;
  durationSeconds: number;
  views: number;
}

class UploadsService {
  getUploadsByChannelId(channelId: MongoId): Upload[] {
    const numberOfUploads = Math.floor(Math.random() * 10) + 1; // Random number of uploads
    let uploads = [];

    for (let i = 0; i < numberOfUploads; i++) {
      uploads.push(generateRandomUpload(channelId));
    }

    return uploads;
  }
}

function generateRandomUpload(channelId: MongoId): Upload {
  return {
    _id: "65652a28b464b45ed108d51e",
    channelId: channelId,
    title: `Random Title ${Math.floor(Math.random() * 100)}`,
    uploadDate: new Date(),
    thumbnailUrl: `https://via.placeholder.com/1280x720`,
    clips: generateRandomClips(),
    processingDetails: generateRandomProcessingDetails(),
  };
}

function generateRandomClips() {
  const numberOfClips = Math.floor(Math.random() * 5) + 1;
  let clips = [];

  for (let i = 0; i < numberOfClips; i++) {
    clips.push({
      title: `Clip Title ${Math.floor(Math.random() * 100)}`,
      creatorName: `Creator ${Math.floor(Math.random() * 100)}`,
      creatorUrl: `https://example.com/creator/${Math.floor(Math.random() * 100)}`,
      downloadUrl: `https://example.com/download/${Math.floor(Math.random() * 100)}`,
      originalUrl: `https://example.com/original/${Math.floor(Math.random() * 100)}`,
      durationSeconds: Math.floor(Math.random() * 300), // Random duration up to 5 minutes
      views: Math.floor(Math.random() * 10000),
    });
  }

  return clips;
}

function generateRandomProcessingDetails() {
  return {
    curateTime: Math.floor(Math.random() * 1000),
    downloadTime: Math.floor(Math.random() * 1000),
    preProcessTime: Math.floor(Math.random() * 1000),
    concatenateTime: Math.floor(Math.random() * 1000),
    generateMetadataTime: Math.floor(Math.random() * 1000),
    uploadYoutubeTime: Math.floor(Math.random() * 1000),
  };
}

export default UploadsService;
