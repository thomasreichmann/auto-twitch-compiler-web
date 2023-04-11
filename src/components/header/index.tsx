import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{session?.user?.email}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography sx={{ flexGrow: 1 }}>{session?.user?.name}</Typography>
          <Button onClick={() => signOut()} variant="contained" color="warning">
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
