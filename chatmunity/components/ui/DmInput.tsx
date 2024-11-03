'use client'

import axios from "axios";
import Input from "../common/Input";
import { useState } from "react";
import { Session } from "next-auth";
import { Dm } from "@/types";

interface Props {
  session: Session | null,
  roomId: string,
}

export default function DmInput(props: Props) {
  const { session, roomId } = props;

  const [text, setText] = useState<string>('');

  return (
    <Input buttonText='보내기' textState={text} setText={setText} onSubmit={(e) => {
      e.preventDefault();

      const dm: Dm =  {
        writer: session?.user?.email as string,
        content: text,
        date: new Date().toString(),
        name: session?.user?.name as string,
        room_id: roomId,
      }

      axios.post('/api/dm', dm)
        .then((res) => {
          console.log(res);
        })
        .catch(e => console.log(e));
    }} />
  );
}