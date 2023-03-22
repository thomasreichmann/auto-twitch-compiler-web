import { Russo_One } from "@next/font/google";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

type LoginProps = {
  callbackUrl: String | undefined;
};

export default function Login() {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "" })}>login</button>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query);

  const props: LoginProps = {
    callbackUrl: context.query.callbackUrl as String,
  };

  return {
    props: {
      callbackUrl: context.query.callbackUrl,
    },
  };
};
