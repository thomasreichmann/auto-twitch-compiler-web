import ChannelForm from "@/components/channelForm";
import ChannelInfo from "@/components/channelInfo";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { status } = useSession({ required: true });

  return (
    <>
      <Head>
        <title>Compiler</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <ChannelForm />
        </Grid>
        <Grid xs={12} sm={6}>
          <ChannelInfo />
        </Grid>
      </Grid>
    </>
  );
}
