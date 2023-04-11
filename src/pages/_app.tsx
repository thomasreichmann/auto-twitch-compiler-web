import "@/styles/globals.scss";
import { ThemeProvider } from "@emotion/react";
import createTheme from "@mui/material/styles/createTheme";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
