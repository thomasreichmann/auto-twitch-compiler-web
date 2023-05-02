import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../header";
import DrawerContent from "./drawerContent";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import Loading from "./loading";
import { AppBar, DrawerHeader, Main } from "./layout.styles";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const Layout = (page: ReactElement): ReactNode => {
  const [open, setOpen] = useState(false);
  const loading = useLoading();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" open={open}>
            <Header onOpen={handleDrawerOpen} open={open} />
          </AppBar>
        </Box>
      </Grid>
      <Grid>
        <Drawer
          open={open}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <DrawerContent />
        </Drawer>
      </Grid>
      <Grid xs={12} sx={{ height: "100%" }}>
        <Main sx={{ height: "100%" }} open={open}>
          {loading ? <Loading /> : page}
        </Main>
      </Grid>
    </Grid>
  );
};

export default Layout;

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return loading;
};
