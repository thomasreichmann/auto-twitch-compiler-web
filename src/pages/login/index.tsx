import { Button } from "@mui/material";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import React, { ReactNode } from "react";
import { NextPageWithLayout } from "../_app";

interface LoginProps {
  callbackUrl: string;
}

const Login: NextPageWithLayout<LoginProps> = (props: LoginProps) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={() =>
          signIn("google", { callbackUrl: props.callbackUrl ?? "" })
        }
      >
        Login
      </Button>
    </>
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
