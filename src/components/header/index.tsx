import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "next-auth/react";
import React from "react";

export const Header = () => (
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
        <Typography sx={{ flexGrow: 1 }}>test</Typography>
        <Button onClick={() => signOut()} variant="contained" color="warning">
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
);
