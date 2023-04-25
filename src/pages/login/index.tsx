import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import React from "react";
import { NextPageWithLayout } from "../_app";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { SxProps } from "@mui/system/styleFunctionSx";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Footer from "@/components/footer";
import Typography from "@mui/material/Typography";

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
          <Paper elevation={3} sx={{ px: 20 }}>
            <Toolbar disableGutters>
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
          <Box
            sx={{
              mx: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "*": { mt: 4 },
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ maxWidth: "460px" }}
            >
              Automate YouTube uploads with Twitch clips
            </Typography>
            <Typography
              variant="body2"
              sx={{ maxWidth: "360px", color: "text.disabled" }}
            >
              Connect your Twitch.tv account to automatically upload video clips
              to your YouTube channel. Effortlessly manage your content with our
              easy-to-use platform. Try it now!
            </Typography>
          </Box>
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
