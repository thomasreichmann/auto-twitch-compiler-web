import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const boxSx: SxProps = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  paddingTop: "2em",
};

const Loading = () => {
  return (
    <Box sx={boxSx}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
