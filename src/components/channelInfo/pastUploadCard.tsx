import { BarChart, PlayArrow, SignalCellularAlt, SkipNext, SkipPrevious } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextIcon from "./textIcon";

export const PastUploadCard = () => {
  return (
    <Card elevation={4} sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ display: "flex", gap: 1.5 }}>
        <CardMedia
          sx={{ borderRadius: 1, width: "min-content" }}
          component="img"
          height="43"
          image="/example-thumbnail.jpeg"
          alt="Live from space album cover"
        />
        <Box sx={{ height: "min-content", "& > div, &": { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" } }}>
          <Typography component="span" variant="body1">
            Best League clips of the day - loltyler1, lolmalice, ApplesloI, PekinWoof, duoking1, tych
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </Box>
      </CardContent>

      <Divider variant="middle" />

      <CardActions sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
        <TextIcon>123</TextIcon>
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
