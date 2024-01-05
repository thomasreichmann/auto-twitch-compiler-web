import Button from "@mui/material/Button";
import Paper, { PaperProps } from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { PastUploadCard } from "./pastUploadCard";

type Props = {};

const InfoPaper = (p: PaperProps) => (
  <Paper elevation={4} {...p}>
    {p.children}
  </Paper>
);

const ChannelInfo = (props: Props) => {
  return (
    <Paper elevation={1} sx={{ height: "100%", padding: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <PastUploadCard />
        </Grid>
        <Grid xs={6}>
          <InfoPaper sx={{ height: "100px" }}>
            <Button variant="contained"> test</Button>
          </InfoPaper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChannelInfo;
