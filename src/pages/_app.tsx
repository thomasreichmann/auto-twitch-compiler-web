import Layout from "@/components/layout";
import "@/styles/globals.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NextPage } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { ReactElement, ReactNode } from "react";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session?: Session;
};

function App({
  Component,
  // session,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? Layout;

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs}>
          <SnackbarProvider>{getLayout(<Component {...pageProps} />)}</SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default App;
