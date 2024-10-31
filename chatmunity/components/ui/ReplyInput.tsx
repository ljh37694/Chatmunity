import { useState } from "react";
import Button from "../common/Button";
import styles from '@/styles/ui/ReplyInput.module.css';
import axios from "axios";
import { Session } from "next-auth";
import { CommentType } from "@/types";

interface Props {
  session: Session | null,
  data: CommentType,
  rootChatId: string,
  callback: (CommentType: CommentType) => void,
}

export default function ReplyInput(props: Props) {
  const { session, data, rootChatId, callback } = props;

  const [text, setText] = useState<string>('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text === '' || text === null) {
      alert('빈 칸입니다');
    }

    else {
      const comment: CommentType = {
        date: new Date().toISOString(),
        content: text,
        name: session?.user?.name as string,
        post_id: data.post_id,
        writer: session?.user?.email as string,
        root_chat: rootChatId,
      };

      axios.post('/api/replyComment', comment)
        .then((res) => {
          setText('');
          callback({
            date: new Date().toISOString(),
            content: text,
            name: session?.user?.name as string,
            post_id: data.post_id,
            writer: session?.user?.email as string,
            root_chat: rootChatId,
          });
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea rows={3} cols={200} className={styles.commentInput} value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)} />
      <Button text='대댓글' type='submit' className={styles.btn} />
    </form>
  )
}