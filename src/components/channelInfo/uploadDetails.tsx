import { Link as LinkIcon, Movie, PlayCircleOutline, Timer } from "@mui/icons-material";
import { Box, Chip, List, ListItem, Modal, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import { ClipEmbed } from "./clipEmbed";

// Mock data, replace it with actual data
const details = {
  processingTime: 15, // minutes
  clipsFetched: 5,
  clips: getClips(),
};

const iconSx: SxProps = { verticalAlign: "middle", mr: 0.5 };

export const UploadDetails = () => {
  const [open, setOpen] = useState(false);
  const [selectedClipUrl, setSelectedClipUrl] = useState("");

  const handleOpen = (url: string) => {
    setSelectedClipUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        <Timer fontSize="small" sx={iconSx} />
        Processing Time: {details.processingTime} minutes
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        <PlayCircleOutline fontSize="small" sx={iconSx} />
        Clips Fetched: {details.clipsFetched}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        <Movie fontSize="small" sx={iconSx} />
        Fetched Clips URLs:
      </Typography>

      <List>
        {details.clips.map((clip, index) => (
          <ListItem key={index} sx={{ p: 0 }}>
            <Chip
              label={<ClipLabel clip={clip} />}
              variant="outlined"
              onClick={() => handleOpen(clip.originalUrl)}
              sx={{ mr: 1, mb: 1, pl: 0.5 }}
              icon={<LinkIcon />}
            />
          </ListItem>
        ))}
      </List>

      <ClipModal url={selectedClipUrl} open={open} onClose={handleClose} />
    </Box>
  );
};

const ClipLabel = (props: { clip: Clip }) => {
  const { clip } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
      <Typography variant="body2" noWrap sx={{ flexGrow: 1, minWidth: "40px" }}>
        {clip.title}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap sx={{ flexShrink: 0, ml: 0.5 }}>
        by {clip.creatorName} - {clip.views} views
      </Typography>
    </Box>
  );
};

const ClipModal = (props: { url: string; open: boolean; onClose: () => any }) => {
  const { url, open, onClose } = props;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="clip-modal-title" aria-describedby="clip-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" }, // Responsive width
          maxWidth: "620px", // Max width of the content
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: "hidden", // Ensures the content doesn't overflow
        }}
      >
        <ClipEmbed url={url} />
      </Box>
    </Modal>
  );
};

// Temp mock stuff
export interface Clip {
  title: string;
  creatorName: string;
  creatorUrl: string;
  downloadUrl: string;
  originalUrl: string;
  durationSeconds: number;
  views: number;
}

function getClips(): Clip[] {
  return [
    {
      title: "why auti left t1 valorant",
      creatorName: "autimaticTV",
      creatorUrl: "http://twitch.tv/autimaticTV",
      downloadUrl: "https://clips-media-assets2.twitch.tv/xMjr7aJW56aNvrYiriXK6w/AT-cm%7CxMjr7aJW56aNvrYiriXK6w.mp4",
      originalUrl: "https://clips.twitch.tv/ProductiveOilyWaterUnSane-olbnpo2-tiKuJcrr",
      durationSeconds: 59.9,
      views: 4079,
    },
    {
      title: "Don't you dare push me",
      creatorName: "s0mcs",
      creatorUrl: "http://twitch.tv/s0mcs",
      downloadUrl: "https://clips-media-assets2.twitch.tv/qeHuT6_duaTkGZ-j4X_bGg/AT-cm%7CqeHuT6_duaTkGZ-j4X_bGg.mp4",
      originalUrl: "https://clips.twitch.tv/TenuousAthleticStapleNononoCat-r925pOQZn6Phf9sa",
      durationSeconds: 60,
      views: 1243,
    },
    {
      title: "guys Shanks is calm af",
      creatorName: "shanks_ttv",
      creatorUrl: "http://twitch.tv/shanks_ttv",
      downloadUrl: "https://clips-media-assets2.twitch.tv/dWumzNCCZmOLTCLEtXVXgA/AT-cm%7CdWumzNCCZmOLTCLEtXVXgA.mp4",
      originalUrl: "https://clips.twitch.tv/PrettiestHotCheddarSSSsss-0IJmY4tMIsS1dVeA",
      durationSeconds: 23.2,
      views: 1011,
    },
    {
      title: "W",
      creatorName: "a2guapo",
      creatorUrl: "http://twitch.tv/a2guapo",
      downloadUrl: "https://clips-media-assets2.twitch.tv/eFLvlCFmcDGnu-5v80wt2g/43358454715-offset-518.mp4",
      originalUrl: "https://clips.twitch.tv/OnerousImpartialAlligatorLeeroyJenkins-IWZwMae77m_zTC3a",
      durationSeconds: 30,
      views: 1001,
    },
    {
      title: "meili is her ",
      creatorName: "meilizzz",
      creatorUrl: "http://twitch.tv/meilizzz",
      downloadUrl: "https://clips-media-assets2.twitch.tv/VepZbYinlfiD4fV_D4nFFg/43353216699-offset-6496.mp4",
      originalUrl: "https://clips.twitch.tv/CuriousAuspiciousSpiderKappaPride-iKeV-IPh9X8PicUW",
      durationSeconds: 26,
      views: 703,
    },
    {
      title: "FIRST EVER FACECAM STREAM ITS A BIG DAY phew | twitter @a2guapo2",
      creatorName: "a2guapo",
      creatorUrl: "http://twitch.tv/a2guapo",
      downloadUrl: "https://clips-media-assets2.twitch.tv/7yCrezig2qzs5xFxrg2c4Q/43358454715-offset-498.mp4",
      originalUrl: "https://clips.twitch.tv/ClearEmpathicCourgetteAMPEnergy-OKDarOznEXGuDZzh",
      durationSeconds: 28,
      views: 663,
    },
    {
      title: "auti got offers",
      creatorName: "autimaticTV",
      creatorUrl: "http://twitch.tv/autimaticTV",
      downloadUrl: "https://clips-media-assets2.twitch.tv/T9HY6-PCOMXvf96UmxDdfA/AT-cm%7CT9HY6-PCOMXvf96UmxDdfA.mp4",
      originalUrl: "https://clips.twitch.tv/BoldLitigiousGarbageRiPepperonis-48I4xe9_3pSbEN18",
      durationSeconds: 35,
      views: 662,
    },
  ];
}
