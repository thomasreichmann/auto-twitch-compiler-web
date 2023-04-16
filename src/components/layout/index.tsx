import React, { ReactElement, ReactNode } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../header";

const Layout = (page: ReactElement): ReactNode => {
  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid>
          <Header />
        </Grid>
        <Grid>{page}</Grid>
      </Grid>
    </>
  );
};

export default Layout;
