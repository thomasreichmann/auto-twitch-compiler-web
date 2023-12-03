import Footer from "@/components/footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { SxProps } from "@mui/system/styleFunctionSx";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { NextPageWithLayout } from "../_app";

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
        <Grid sx={{ width: "100%" }}>
          <Paper elevation={3} sx={{ px: { xs: 4, sm: 20 } }}>
            <Toolbar disableGutters>
              {/* <Image src={logoImg} alt="Vid Sync Logo" width={58} height={58} /> */}
              <Typography variant="h5" sx={{ flexGrow: 1, ml: 1 }}>
                Vid Sync
              </Typography>
              <Button variant="contained" onClick={() => signIn("google", { callbackUrl: props.callbackUrl ?? "" })}>
                Login
              </Button>
            </Toolbar>
          </Paper>
        </Grid>
        <Grid sx={{ display: "flex", flexGrow: 1 }}>
          <Box
            sx={{
              mx: { xs: 0, sm: 20 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", sm: "start" },
              textAlign: { xs: "center", sm: "start" },
              "& :is(h3, p):not(:first-child)": { mt: 4 },
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                maxWidth: { xs: "95%", sm: "460px" },
              }}
            >
              Automate YouTube uploads with Twitch clips
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: "360px", color: "text.disabled" }}>
              Connect your Twitch.tv account to automatically upload video clips to your YouTube channel. Effortlessly
              manage your content with our easy-to-use platform. Try it now!
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

export const getServerSideProps: GetServerSideProps<LoginProps> = async (context) => {
  let callbackPath = context.query.callbackUrl as string | null; // or rename to 'callbackPath'

  // If callbackPath is not null, reconstruct the full URL using the host information
  if (callbackPath) {
    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const host = context.req.headers.host;
    callbackPath = `${protocol}://${host}${callbackPath}`;
  }

  return {
    props: {
      callbackUrl: callbackPath ?? "",
    },
  };
};

export default Login;
