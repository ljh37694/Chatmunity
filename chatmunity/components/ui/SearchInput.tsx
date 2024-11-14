'use client'

import { useState } from "react";
import Input from "../common/Input";
import { useRouter } from "next/navigation";

interface Props {

}

export default function(props: Props) {
  const [text, setText] = useState<string>('');

  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push('/search/' + encodeURIComponent(text));
  };

  return (
    <Input buttonText="검색" onSubmit={onSubmit} textState={text} setText={setText} />
  );
}