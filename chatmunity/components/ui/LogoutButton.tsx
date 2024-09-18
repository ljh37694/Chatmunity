import { signOut } from "next-auth/react";
import Button from "../common/Button";

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut()} text="로그아웃" />
  );
}