import { ExitToAppOutlined } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { signOut, useSession } from "next-auth/react";

export type BarContentProps = {
  onDrawerClick: () => void;
  open: boolean;
};

export const BarContent = ({ onDrawerClick, open }: BarContentProps) => {
  const { data: session, status } = useSession();

  return (
    <>
      {/* <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
        onClick={onDrawerClick}
      >
        <MenuIcon />
      </IconButton> */}
      <Paper elevation={12} sx={{ borderRadius: "50%" }}>
        <Avatar alt="channel-avatar" src={session?.user?.image ?? ""} sx={{ marginRight: 2 }} />
      </Paper>
      <Grid container columnSpacing={2} sx={{ flexGrow: 1, alignItems: "center" }}>
        <Grid>
          <Typography variant="h6">{session?.user?.name}</Typography>
        </Grid>

        <Divider orientation="vertical" variant={"middle"} flexItem />

        <Grid xs>
          <Typography>{session?.user?.email}</Typography>
        </Grid>
        <Grid>
          <Paper elevation={12} sx={{ borderRadius: "50%" }}>
            <IconButton aria-label="sign out" onClick={() => signOut()}>
              <ExitToAppOutlined />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
