import Layout from "@/components/layout";
import "@/styles/globals.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NextPage } from "next";
import { Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect } from "react";

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
  session,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? Layout;

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateLibInstance={dayjs}
        >
          <AuthGuard session={session}>
            <>{getLayout(<Component {...pageProps} />)}</>
          </AuthGuard>
        </LocalizationProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  let ctx = await NextApp.getInitialProps(context);
  let session = await getSession(context.ctx);

  return { session, ...ctx };
};

const AuthGuard = ({
  children,
  session,
}: {
  children: ReactElement;
  session?: Session;
}) => {
  const router = useRouter();

  useEffect(() => {
    const activePathname = new URL(router.asPath, location.href).pathname;
    if (!session && activePathname != "/login") {
      router.push("/login");
    }
  }, [router]);

  return children;
};

export default App;
