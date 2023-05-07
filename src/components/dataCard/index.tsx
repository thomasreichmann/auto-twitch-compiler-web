import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const DataCard = () => {
  return (
    <Card
      elevation={4}
      raised
      sx={{
        minWidth: 275,
        minHeight: 275,
        maxWidth: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" gutterBottom>
          Uploads from week
        </Typography>
        <Typography variant="h3" color="text.secondary">
          25.4 K
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Refresh">
          <IconButton aria-label="info-refresh-button">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default DataCard;
