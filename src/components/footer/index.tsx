import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SxProps, useTheme } from "@mui/material/styles";
import Link from "next/link";
import React, { ReactNode } from "react";

const Footer = () => {
  return (
    <Paper>
      <Toolbar sx={{ display: "flex", justifyContent: "space-around", p: 3 }}>
        <div>
          <Title>Info</Title>
          <P>
            Created with <span>⚛︎</span> and 💘
          </P>
          <P>- thomas</P>
        </div>
        <div>
          <Title>Links</Title>
          <P href="https://github.com/thomasreichmann/auto-twitch-compiler-web">
            Github
          </P>
          <P href="https://thomasar.dev/">me</P>
        </div>
      </Toolbar>
    </Paper>
  );
};

const Title = ({ children }: { children?: ReactNode }) => {
  return (
    <Typography sx={{ p: 0.5 }} variant="body1">
      {children}
    </Typography>
  );
};

const P = ({ children, href }: { children?: ReactNode; href?: string }) => {
  const textSx: SxProps = {
    color: "text.disabled",
    p: 0.5,
    "& span": { color: "#61dbfb" },
  };

  const linkSx: SxProps = {
    "& a": {
      textDecoration: "none",
      color: "text.disabled",
      ":hover": {
        color: "primary.dark",
      },
    },
  };

  if (href == null) {
    return (
      <Typography sx={textSx} variant="body2">
        {children}
      </Typography>
    );
  } else {
    return (
      <Typography sx={{ ...textSx, ...linkSx }} variant="body2">
        <a href={href}>{children}</a>
      </Typography>
    );
  }
};

export default Footer;
