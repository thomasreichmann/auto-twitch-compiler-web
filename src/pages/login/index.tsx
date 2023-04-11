import { Button } from "@mui/material";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import React from "react";

interface LoginProps {
  callbackUrl: string;
}

export default function Login(props: LoginProps) {
  console.log(props);
  return (
    <>
      <Button>Test</Button>
      <button
        onClick={() =>
          signIn("google", { callbackUrl: props.callbackUrl ?? "" })
        }
      >
        login
      </button>
    </>
  );
}

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
