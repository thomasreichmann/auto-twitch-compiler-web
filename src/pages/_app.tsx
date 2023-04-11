import Layout from "@/components/layout";
import "@/styles/globals.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

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
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? Layout;

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SessionProvider>
  );
}
