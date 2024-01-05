import { PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export const PastUploadCard = () => {
  return (
    <Card elevation={4} sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ display: "flex", gap: 1.5 }}>
        <Box sx={{ minWidth: "112px" }}>
          <CardMedia
            sx={{ borderRadius: 1 }}
            component="img"
            width="112"
            height="64"
            image="/example-thumbnail.jpeg"
            alt="Live from space album cover"
          />
        </Box>
        <Box sx={{ "& > div, &": { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" } }}>
          <Typography component="span" variant="body1">
            Best League clips of the day - loltyler1, lolmalice, ApplesloI, PekinWoof, duoking1, tych
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </Box>
      </CardContent>

      <Divider sx={{}} variant="middle" />

      <CardActions sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
        <IconButton aria-label="previous">
          <SkipPrevious />
        </IconButton>
        <IconButton aria-label="play/pause">
          <PlayArrow />
        </IconButton>
        <IconButton aria-label="next">
          <SkipNext />
        </IconButton>
      </CardActions>
    </Card>
  );
};
