import { useUploads } from "@/hooks/useUploads";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { UploadCard } from "./uploadCard";

const ChannelInfo = () => {
  const { loading, uploads, reloadUploads } = useUploads();

  return (
    <Paper elevation={1} sx={{ height: "100%", padding: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <UploadCard
            isPast={false}
            title="Next upload:"
            date="Mon Jan 08 2024 04:11:35 GMT-03 (Brasilia Standard Time)"
            image="/pending-thumbnail.jpeg"
          />
        </Grid>
        {loading ? (
          <Grid xs={12}>
            <LinearProgress sx={{ ml: 2, mr: 2 }} />
          </Grid>
        ) : (
          uploads.map((upload, index) => (
            <Grid xs={12} key={index}>
              <UploadCard
                isPast={true}
                date={upload.uploadDate.toString()}
                title={upload.title}
                image={upload.thumbnailUrl}
                comments={10}
                likes={100}
                views={102}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  );
};

export default ChannelInfo;
