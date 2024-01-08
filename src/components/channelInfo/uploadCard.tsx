import { BarChart, Comment, ThumbUp } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, Skeleton, styled } from "@mui/material";
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

interface UploadCardProps {
  isPast: boolean;
  image: string;
  title: string;
  date: string;
  views?: number;
  likes?: number;
  comments?: number;
  details?: any; // Replace with actual type for details
}

export const UploadCard = ({ isPast, image, title, date, views, likes, comments, details }: UploadCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card elevation={4} sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ display: "flex", gap: 1.5 }}>
        <CardMedia
          sx={{ borderRadius: 1, width: "min-content" }}
          component="img"
          height="43"
          image={image}
          alt="thumbnail"
        />
        <Box
          sx={{
            height: "min-content",
            "& > div, &": { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" },
          }}
        >
          <Typography component="span" variant="body1">
            {isPast ? title : "Next upload based on channel settings"}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            {date}
          </Typography>
        </Box>
      </CardContent>

      <Divider variant="middle" />

      <CardActions sx={{ pl: 2, display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", gap: 3, overflow: "hidden" }}>
          {isPast ? (
            <>
              <TextIcon icon={<BarChart fontSize="small" />}>{views ?? <Skeleton width="20px" />}</TextIcon>
              <TextIcon icon={<ThumbUp fontSize="small" />}>{likes ?? <Skeleton width="20px" />}</TextIcon>
              <TextIcon icon={<Comment fontSize="small" />}>{comments ?? <Skeleton width="20px" />}</TextIcon>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
              Upcoming upload details...
            </Typography>
          )}
        </Box>
        {isPast && (
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
        )}
      </CardActions>

      {expanded && <Divider variant="middle" />}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ "&&": { pb: 1 } }}>
          {isPast ? <UploadDetails /> : <Typography variant="body2">More info coming soon...</Typography>}
        </CardContent>
      </Collapse>
    </Card>
  );
};
