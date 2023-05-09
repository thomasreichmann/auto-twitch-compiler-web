import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps } from "@mui/material/styles";

const boxSx: SxProps = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  paddingTop: "2em",
};

type LoadingProps = {
  sx?: SxProps;
};

const Loading = (props: LoadingProps) => {
  return (
    <Box sx={{ ...boxSx, ...props.sx }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
