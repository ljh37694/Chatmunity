'use client'

import { signIn } from "next-auth/react";
import Button from "../common/Button";

export default function LoginButton() {
  return (
    <Button onClick={() => signIn()} text="로그인" />
  );
}