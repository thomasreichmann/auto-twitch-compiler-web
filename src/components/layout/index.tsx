import React, { ReactElement, ReactNode } from "react";
import Grid from "@mui/material/Unstable_Grid2";

const Layout = (page: ReactElement): ReactNode => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid>test</Grid>
        <Grid>{page}</Grid>
      </Grid>
    </>
  );
};

export default Layout;
