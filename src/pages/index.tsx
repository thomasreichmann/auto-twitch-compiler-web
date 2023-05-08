import Head from "next/head";
import channelService, { Channel } from "@/services/channelService";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { youtube_v3 } from "googleapis";
import Paper from "@mui/material/Paper";
import DataCard from "@/components/dataCard";
import AutocompleteSelect, { Option } from "@/components/autocompleteSelect";
import { SyntheticEvent, useEffect, useState } from "react";
import infoService, { AvailableGame } from "@/services/infoService";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import ChannelForm from "@/components/channelForm";

export type HomeProps = {
  channel: youtube_v3.Schema$Channel;
};

export default function Home({ channel }: HomeProps) {
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  let session = await getServerSession(context.req, context.res, authOptions);
  if (!session) throw new Error("No session found");

  let channel = await channelService.getChannel(session?.account);

  let availableGames = await infoService.getAvailableGames();

  return {
    props: {
      channel,
      availableGames: JSON.parse(JSON.stringify(availableGames)),
    },
  };
};
