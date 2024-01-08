import Paper, { PaperProps } from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { UploadCard } from "./uploadCard";

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
          <UploadCard
            isPast={false}
            title="Next upload:"
            date="Estimated Upload: Mon Jan 08 2024 04:11:35 GMT-03 (Brasilia Standard Time)"
          />
        </Grid>
        <Grid xs={12}>
          <UploadCard
            isPast={true}
            date="Uploaded: Mon Jan 08 2024 04:11:35 GMT-03 (Brasilia Standard Time)"
            title="Best League clips of the day - loltyler1, lolmalice, ApplesloI, PekinWoof, duoking1, tych"
            comments={10}
            likes={100}
            views={102}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChannelInfo;
