import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export type BarContentProps = {
  onDrawerClick: () => void;
  open: boolean;
};

export const BarContent = ({ onDrawerClick, open }: BarContentProps) => {
  const { data: session, status } = useSession();

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
        onClick={onDrawerClick}
      >
        <MenuIcon />
      </IconButton>

      <Grid
        container
        columnSpacing={2}
        sx={{ flexGrow: 1, alignItems: "center" }}
      >
        <Grid>
          <Typography variant="h6">{session?.user?.name}</Typography>
        </Grid>

        <Divider orientation="vertical" variant={"middle"} flexItem />

        <Grid xs>
          <Typography>{session?.user?.email}</Typography>
        </Grid>
        <Grid>
          <Button onClick={() => signOut()} variant="contained" color="warning">
            Sign out
          </Button>
        </Grid>
      </Grid>
    </>
  );
};