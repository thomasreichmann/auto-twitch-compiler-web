import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import React, { ReactNode } from "react";
import { NextPageWithLayout } from "../_app";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { SxProps } from "@mui/system/styleFunctionSx";
import Header from "@/components/header";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Footer from "@/components/footer";
import { Typography } from "@mui/material";

interface LoginProps {
  callbackUrl: string;
}

const boxSx: SxProps = {
  height: "100vh",
};

const Login: NextPageWithLayout<LoginProps> = (props: LoginProps) => {
  return (
    <Box sx={boxSx}>
      <Grid container direction="column" sx={{ height: "100%" }}>
        <Grid>
          <Paper elevation={3} sx={{ px: 16 }}>
            <Toolbar>
              <Typography sx={{ flexGrow: 1 }}>StreamLink LOGO</Typography>
              <Button
                variant="contained"
                onClick={() =>
                  signIn("google", { callbackUrl: props.callbackUrl ?? "" })
                }
              >
                Login
              </Button>
            </Toolbar>
          </Paper>
        </Grid>
        <Grid sx={{ display: "flex", flexGrow: 1 }}>
          <h1>Middle</h1>
        </Grid>
        <Grid>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};

Login.getLayout = (page) => page;

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context
) => {
  let callbackUrl = context.query.callbackUrl as string | null;

  return {
    props: {
      callbackUrl: callbackUrl ?? "",
    },
  };
};

export default Login;
