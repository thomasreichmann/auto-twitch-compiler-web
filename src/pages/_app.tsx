import Layout from "@/components/layout";
import "@/styles/globals.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NextPage } from "next";
import { Session, getServerSession } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";
import { Router as router, useRouter } from "next/router";
import {
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";

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

  // console.log(session);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        <AuthGuard session={session}>
          <>{getLayout(<Component {...pageProps} />)}</>
        </AuthGuard>
      </ThemeProvider>
    </SessionProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  let ctx = await NextApp.getInitialProps(context);
  let session = await getSession(context.ctx);

  // console.log(session);

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
