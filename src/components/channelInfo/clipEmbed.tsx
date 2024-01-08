import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

interface ClipEmbedProps {
  url: string;
}

export const ClipEmbed = (props: ClipEmbedProps) => {
  const [loaded, setLoaded] = useState(false);

  // Calculate aspect ratio percentage for padding to "calculate" the needed height
  const aspectRatio = (378 / 620) * 100;

  return (
    <Box>
      <Box
        id="clip-modal-description"
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: `${aspectRatio}%`,
        }}
      >
        {!loaded && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <iframe
          style={{
            display: loaded ? "block" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          src={convertToEmbedUrl(props.url)}
          allowFullScreen={true}
          onLoad={() => setLoaded(true)}
        ></iframe>
      </Box>
    </Box>
  );
};

function convertToEmbedUrl(clipUrl: string) {
  const clipId = clipUrl.split("/").pop();
  const embedUrl = `https://clips.twitch.tv/embed?clip=${clipId}&parent=${window.location.hostname}`;
  return embedUrl;
}
