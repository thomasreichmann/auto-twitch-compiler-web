import { BarChart, Comment, ThumbUp } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TextIcon from "./textIcon";
import { UploadDetails } from "./uploadDetails";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PastUploadCard = () => {
  const [expanded, setExpanded] = useState(false);

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
        <Box
          sx={{
            height: "min-content",
            "& > div, &": { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
          }}
        >
          <Typography component="span" variant="body1">
            Best League clips of the day - loltyler1, lolmalice, ApplesloI, PekinWoof, duoking1, tych
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            Uploaded: Mon Jan 08 2024 04:11:35 GMT-03 (Brasilia Standard Time)
          </Typography>
        </Box>
      </CardContent>

      <Divider variant="middle" />

      <CardActions sx={{ pl: 2, display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", gap: 3, overflow: "hidden" }}>
          <TextIcon icon={<BarChart fontSize="small" />}>123</TextIcon>
          <TextIcon icon={<ThumbUp fontSize="small" />}>0</TextIcon>
          <TextIcon icon={<Comment fontSize="small" />}>0</TextIcon>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <ExpandMore
            expand={expanded}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      </CardActions>

      {expanded && <Divider variant="middle" />}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ "&&": { pb: 1 } }}>
          <UploadDetails />
        </CardContent>
      </Collapse>
    </Card>
  );
};
