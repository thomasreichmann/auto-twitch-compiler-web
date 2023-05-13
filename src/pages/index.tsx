import ChannelForm from "@/components/channelForm";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Compiler</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <ChannelForm />
        </Grid>
        <Grid xs={12} sm={6}>
          <Paper elevation={1} sx={{ height: "100%", padding: 3 }}></Paper>
        </Grid>
      </Grid>
    </>
  );
}
